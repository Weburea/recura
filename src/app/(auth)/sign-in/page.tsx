import { AuthLayout } from '@/components/authentication/auth-layout';
import { SignIn } from '@/components/authentication/sign-in';

export default function SignInPage() {
  return (
    <AuthLayout imageSrc="/images/auth/side_2.png" imageAlt="Sign In to Recura">
      <SignIn />
    </AuthLayout>
  );
}
