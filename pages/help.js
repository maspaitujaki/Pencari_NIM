import Layout from "../components/layout"
import Link from "next/link"

export default function Help() {
    return (
        <Layout>
            <Link href="/">
                <a className="text-blue-500 font-bold hover:underline">Back to home!</a>
            </Link>
        </Layout>
    )
}
