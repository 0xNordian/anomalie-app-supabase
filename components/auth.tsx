import { supabase } from "../utils/supabaseClient";
import { Auth } from '@supabase/auth-ui-react'

const AuthPage = () => <Auth supabaseClient={supabase} />
