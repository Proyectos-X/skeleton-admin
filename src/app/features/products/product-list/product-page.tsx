import { Container } from '@/app/components/common/container';
import { StackedDrawer } from '@/app/components/common/modals/stacked-drawer';
import { StackedModalProvider } from '@/app/components/common/modals/stacked-modal-provider';
import { Button } from '@/app/components/ui';
import { TwoColumnPage } from '@/app/layouts/two-column-layout';
import { Link, Outlet } from 'react-router';

const ProductPage = () => {
  return (
    <section>
      <TwoColumnPage hasOutlet={false}>
        <Container>
          <h1 className="text-2xl font-bold">hoal</h1>
          <p className="text-gray-700">hola</p>
          <p className="text-green-600 font-semibold">f</p>
          <Link to="create">Create</Link>
          <StackedModalProvider>
            <StackedDrawer id={'d'}>
              <StackedDrawer.Trigger asChild>
                <Button variant="secondary">HOILA</Button>
              </StackedDrawer.Trigger>
              <StackedDrawer.Content>
                <StackedDrawer.Header>
                  <StackedDrawer.Title asChild>H!</StackedDrawer.Title>
                  <StackedDrawer.Description className="sr-only">H"</StackedDrawer.Description>
                </StackedDrawer.Header>
              </StackedDrawer.Content>
            </StackedDrawer>
          </StackedModalProvider>
        </Container>

        <Container>
          <h2 className="text-lg font-medium">Opciones</h2>
          <button className="px-4 py-2 bg-black text-white rounded">Comprar</button>
        </Container>
      </TwoColumnPage>
      <Outlet />
    </section>
  );
};

export default ProductPage;
