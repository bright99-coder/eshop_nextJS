import { AuthProvider } from "./AuthContext";
import { CompareProvider } from "./CompareContext";
import { OrderProvider } from "./OrderContext";
import { ShoppingCartProvider } from "./ShoppingCartContext";

interface AppContextProps {
  children: React.ReactNode;
}

export const AppContext: React.FC<AppContextProps> = ({ children }) => {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <OrderProvider>
          <CompareProvider>{children}</CompareProvider>
        </OrderProvider>
      </ShoppingCartProvider>
    </AuthProvider>
  );
};
