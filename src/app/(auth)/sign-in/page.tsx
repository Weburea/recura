import { AuthLayout } from '@/components/authentication/auth-layout';
import { SignIn } from '@/components/authentication/sign-in';

export default function SignInPage() {
  return (
    <AuthLayout 
      imageSrc="/images/auth/dashboard.png" 
      darkImageSrc="/images/auth/dashboard_dark.png"
      imageAlt="Sign In to Recura"
    >
      <SignIn />
    </AuthLayout>
  );
}
