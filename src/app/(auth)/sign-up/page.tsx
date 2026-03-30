import { AuthLayout } from '@/components/authentication/auth-layout';
import { SignUp } from '@/components/authentication/sign-up';

export default function SignUpPage() {
  return (
    <AuthLayout 
      imageSrc="/images/auth/dashboard.png" 
      darkImageSrc="/images/auth/dashboard_dark.png"
      imageAlt="Sign Up to Recura"
    >
      <SignUp />
    </AuthLayout>
  );
}
