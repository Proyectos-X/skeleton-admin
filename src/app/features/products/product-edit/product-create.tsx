
import { loginSchema } from '../../auth/login';
import { useZodForm } from '@/shared/form';
import { RouteDrawer } from '@/app/components/common/modals';

const ProductCreate = () => {
  const form = useZodForm(loginSchema, {
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <RouteDrawer>
      <RouteDrawer.Form form={form}>
        <RouteDrawer.Body className="w-screen overflow-hidden">HOLAA</RouteDrawer.Body>
      </RouteDrawer.Form>
    </RouteDrawer>
  );
};

export default ProductCreate;