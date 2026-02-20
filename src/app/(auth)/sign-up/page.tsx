import { AuthLayout } from '@/components/authentication/auth-layout';
import { SignUp } from '@/components/authentication/sign-up';

export default function SignUpPage() {
  return (
    <AuthLayout imageSrc="/images/auth/side_1.png" imageAlt="Sign Up to Recura">
      <SignUp />
    </AuthLayout>
  );
}
