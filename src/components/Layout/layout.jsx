import Cabezera from "./Cabezera";

function Layout({ children }){
    return(
        <>
            <Cabezera/>
            <main>
                {children}
            </main>
        </>
    )
}
export default Layout