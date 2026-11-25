"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/dist/client/components/navigation"
import { cookies } from "next/dist/server/request/cookies"

export async function registerAction(prevState: {error?: string} | undefined, formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || !email || !password) {
        return { error: "Eusian atuhh manggg!!" 

        }
    }

    if (password.length < 6) {
        return { error: "Password na kurang panjangg manggg!!" 

        }
    }

    if (!email.includes("@")) {
        return { error: "Email na henteu Validd manggg!!" 

        }

    }

    const existUser = await prisma.user.findUnique({where: {email}})
    if (existUser) {
        return { error: "Email teu kapanggih manggg!!"}
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    redirect("/login")
}


export async function loginAction(prevState: {error?: string} | undefined, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
        return { error: "Eusian atuh manggg!!" 
        }
    }

    if (password.length < 6) {
        return { error: "Password na kurang panjangg manggg!!" 
        }
    }

    const user = await prisma.user.findUnique({where: {email}})
    if (!user) {
        return { error: "Email teu kapanggih!!" 
        }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return { error: "Password salah manggg!!" 
        }
    }

    const isMacth = await bcrypt.compare(password, user.password)
    if (!isMacth) {
        return { error: "Email atawa password salah manggg!!" 
        }
    }

    const sessionPayload = JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        loginAt: new Date().toISOString()
    })

    const cookieStore = await cookies()
    cookieStore.set("prak_session", sessionPayload, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/"
    })
    
    redirect("/dashboard")


}

export async function logoutAction() {
    const cookieStore = await cookies()
    cookieStore.delete("prak_session")
    redirect("/login")
}
