import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import {
    Home,
    Cart,
    Login,
    Orders,
    Profile,
    Payment,
    ProductList,
    Header,
    Footer
} from "./customerApp/components";
import NotFoundView from "./errors/NotFoundView"
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "./AdminPanel/theme/GlobalStyles"
import theme from './AdminPanel/theme';
import DashboardLayout from './AdminPanel/layout/DashboardLayout'
import { DashboardView, CustomerListView, OrdersListView, ProductListView } from './AdminPanel/views/index'
const promise = loadStripe(
    "pk_test_51GoSJxAItgkmdP1PK6MEKu6jKtSvPvIkc7fA4v83PhWzS4znGkC5AAkfbelCPPEe4NSbxQrUz2pJutDPg2DSg1SE00JCvV06ob"
);
const RouterFile = () => {
    return (
        <>
            {/* customer app routes */}
            <Switch>
                <Route exact
                    path="/cart" >
                    <Header />
                    <Cart />
                    <Footer />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route exact path="/orders">
                    <Header />
                    <Orders />
                    <Footer />
                </Route>
                <Route exact path="/products">
                    <Header />
                    <ProductList />
                    <Footer />
                </Route>
                <Route exact path="/payment">
                    <Header />
                    <Elements stripe={promise}>
                        <Payment />
                    </Elements>
                    <Footer />
                </Route>
                <Route exact path="/" >
                    <Header />
                    <Home />
                    <Footer />
                </Route>
                {/* customer app route ends */}
                {/* admin panel  */}

                <Route exact path="/admin/dashboard" >
                    <ThemeProvider theme={theme}>
                        <GlobalStyles />
                        <DashboardLayout>
                            <DashboardView />
                        </DashboardLayout>
                    </ThemeProvider>
                </Route>
                <Route exact path="/admin/customers">
                    <ThemeProvider theme={theme}>
                        <GlobalStyles />
                        <DashboardLayout>
                            <CustomerListView />
                        </DashboardLayout>
                    </ThemeProvider>
                </Route>
                <Route exact path="/admin/orders">
                    <ThemeProvider theme={theme}>
                        <GlobalStyles />
                        <DashboardLayout>
                            <OrdersListView />
                        </DashboardLayout>
                    </ThemeProvider>
                </Route>
                <Route exact path="/admin/products">
                    <ThemeProvider theme={theme}>
                        <GlobalStyles />
                        <DashboardLayout>
                            <ProductListView />
                        </DashboardLayout>
                    </ThemeProvider>
                </Route>
                <Route exact path="/admin/">
                    <ThemeProvider theme={theme}>
                        <GlobalStyles />
                        <DashboardLayout>
                            <DashboardView />
                        </DashboardLayout>
                    </ThemeProvider>
                </Route>
                {/* admin panel ends */}
                <Route>
                    <NotFoundView />
                </Route>
            </Switch>
        </>
    )
}

export default RouterFile
