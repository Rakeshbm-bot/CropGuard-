-- ====================================================================
-- CROPGUARD KISAN PORTAL - COMPLETE SUPABASE DATABASE SETUP SCRIPT
-- Run this complete script in your Supabase Project -> SQL Editor
-- This sets up all tables, authentication profiles, RLS policies & permissions
-- ====================================================================

-- 1. Grant Schema Permissions to prevent Error 42501 (Permission Denied)
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- 2. Timestamp Trigger Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Farmers Table (Authentication Profiles for Phone & Email Logins)
CREATE TABLE IF NOT EXISTS public.farmers (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    phone_or_email TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    name TEXT NOT NULL DEFAULT 'Farmer',
    login_type TEXT DEFAULT 'phone',
    location TEXT DEFAULT 'India (Field Worker)',
    state TEXT,
    district TEXT,
    primary_crop TEXT DEFAULT 'Paddy / Wheat / Tomato',
    land_size TEXT DEFAULT '2 Acres',
    device TEXT DEFAULT 'Mobile Web',
    is_verified BOOLEAN DEFAULT true,
    preferred_language TEXT DEFAULT 'en',
    last_active_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    CONSTRAINT uq_farmers_contact UNIQUE (phone_or_email)
);

-- Ensure updated_at trigger exists
DROP TRIGGER IF EXISTS trg_farmers_updated_at ON public.farmers;
CREATE TRIGGER trg_farmers_updated_at
    BEFORE UPDATE ON public.farmers
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Indexes for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_farmers_contact ON public.farmers(phone_or_email);
CREATE INDEX IF NOT EXISTS idx_farmers_phone ON public.farmers(phone);
CREATE INDEX IF NOT EXISTS idx_farmers_email ON public.farmers(email);
CREATE INDEX IF NOT EXISTS idx_farmers_created_at ON public.farmers(created_at DESC);

-- 4. Crop Scans Table (AI Plant Disease Detection History)
CREATE TABLE IF NOT EXISTS public.crop_scans (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    farmer_id TEXT REFERENCES public.farmers(id) ON DELETE SET NULL,
    user_name TEXT DEFAULT 'Farmer',
    crop TEXT NOT NULL,
    disease_name TEXT NOT NULL,
    severity TEXT NOT NULL DEFAULT 'Medium',
    confidence NUMERIC(5, 2) DEFAULT 0.95,
    location TEXT DEFAULT 'India',
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    symptoms TEXT,
    organic_cure TEXT,
    chemical_cure TEXT,
    fertilizer_advice TEXT,
    image_url TEXT,
    scanned_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX IF NOT EXISTS idx_crop_scans_farmer ON public.crop_scans(farmer_id);
CREATE INDEX IF NOT EXISTS idx_crop_scans_crop ON public.crop_scans(crop);
CREATE INDEX IF NOT EXISTS idx_crop_scans_scanned_at ON public.crop_scans(scanned_at DESC);

-- 5. Mandi Watchlist Table (Realtime Crop Price Alerts)
CREATE TABLE IF NOT EXISTS public.mandi_watchlist (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    farmer_id TEXT REFERENCES public.farmers(id) ON DELETE CASCADE,
    user_contact TEXT NOT NULL,
    crop TEXT NOT NULL,
    market TEXT NOT NULL,
    state TEXT,
    target_price NUMERIC(10, 2),
    alert_triggered BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX IF NOT EXISTS idx_mandi_contact ON public.mandi_watchlist(user_contact);
CREATE INDEX IF NOT EXISTS idx_mandi_crop ON public.mandi_watchlist(crop);

-- 6. Kisan AI Chat History Table
CREATE TABLE IF NOT EXISTS public.kisan_chats (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    farmer_id TEXT REFERENCES public.farmers(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    message TEXT NOT NULL,
    crop_context TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX IF NOT EXISTS idx_kisan_chats_farmer ON public.kisan_chats(farmer_id, created_at ASC);

-- 7. Analytical View for Dashboard
CREATE OR REPLACE VIEW public.v_crop_disease_analytics AS
SELECT 
    crop,
    disease_name,
    severity,
    COUNT(*) AS total_cases,
    ROUND(AVG(confidence), 2) AS avg_confidence,
    MAX(scanned_at) AS last_reported_at
FROM public.crop_scans
GROUP BY crop, disease_name, severity
ORDER BY total_cases DESC;

-- 8. Enable Row Level Security (RLS)
ALTER TABLE public.farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mandi_watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kisan_chats ENABLE ROW LEVEL SECURITY;

-- 9. Create Permissive Policies for App Access
DROP POLICY IF EXISTS "Public farmers access" ON public.farmers;
CREATE POLICY "Public farmers access" ON public.farmers
    FOR ALL
    TO anon, authenticated, service_role
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Public crop_scans access" ON public.crop_scans;
CREATE POLICY "Public crop_scans access" ON public.crop_scans
    FOR ALL
    TO anon, authenticated, service_role
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Public mandi_watchlist access" ON public.mandi_watchlist;
CREATE POLICY "Public mandi_watchlist access" ON public.mandi_watchlist
    FOR ALL
    TO anon, authenticated, service_role
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Public kisan_chats access" ON public.kisan_chats;
CREATE POLICY "Public kisan_chats access" ON public.kisan_chats
    FOR ALL
    TO anon, authenticated, service_role
    USING (true)
    WITH CHECK (true);

-- 10. Enable Supabase Realtime Broadcasting
DO $$
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.farmers;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.crop_scans;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.mandi_watchlist;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.kisan_chats;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
END $$;

-- 11. Optional: Sync from Supabase Auth (auth.users) into public.farmers automatically
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.farmers (id, phone_or_email, phone, email, name, login_type, is_verified)
    VALUES (
        NEW.id::text,
        COALESCE(NEW.phone, NEW.email, 'farmer_' || NEW.id::text),
        NEW.phone,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', 'Farmer'),
        COALESCE(NEW.raw_user_meta_data->>'login_type', CASE WHEN NEW.phone IS NOT NULL THEN 'phone' ELSE 'email' END),
        true
    )
    ON CONFLICT (phone_or_email) DO UPDATE SET
        phone = EXCLUDED.phone,
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        last_active_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_on_auth_user_created ON auth.users;
CREATE TRIGGER trg_on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();
