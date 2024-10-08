import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Dashboard from '@/components/Dashboard'
import { redirect } from 'next/navigation'

const page = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) redirect('/auth-callback?origin=dashboard')

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id
        }
    })

    if (!dbUser) {
        return redirect('/auth-callback?origin=dashboard')
    }

    return (
        <>
        <Dashboard/>
        </>
    )
}

export default page