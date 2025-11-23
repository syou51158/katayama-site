-- Create web_vitals table for performance monitoring
CREATE TABLE IF NOT EXISTS public.web_vitals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    metric_name TEXT NOT NULL,
    metric_value NUMERIC NOT NULL,
    metric_id TEXT NOT NULL,
    metric_label TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    user_agent TEXT,
    url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_web_vitals_metric_name ON public.web_vitals(metric_name);
CREATE INDEX IF NOT EXISTS idx_web_vitals_timestamp ON public.web_vitals(timestamp);
CREATE INDEX IF NOT EXISTS idx_web_vitals_metric_id ON public.web_vitals(metric_id);

-- Grant permissions
GRANT SELECT ON public.web_vitals TO anon;
GRANT SELECT ON public.web_vitals TO authenticated;
GRANT ALL ON public.web_vitals TO service_role;