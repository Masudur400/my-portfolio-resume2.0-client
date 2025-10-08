'use client'
import toast from "react-hot-toast"
import { FiPhone } from "react-icons/fi"
import { IoLocationOutline } from "react-icons/io5"
import { MdOutlineEmail } from "react-icons/md"

export const ContactForm = () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sendMail = async (e : any) => {
        e.preventDefault()
        const form = e.currentTarget;
        const name = form.name.value
        const email = form.email.value;
        const subject = form.subject.value;
        const message = form.message.value;
        const data = {
            name,
            email,
            subject,
            message: `[From My PortFolio]\n\n${message}`
        }
        try {
            const toastId = toast.loading('Mail sending...')
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (result?.success) {
                toast.success('Mail sent.', { id: toastId })
                form.reset();
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="mb-14 mt-20">
            <div className="md:w-3/4 lg:w-3/5 mx-auto p-5 md:p-10 bg-gradient-to-br from-gray-900/5 via-gray-800 to-black/5 rounded-lg border ">
                <div className="md:flex justify-between items-center gap-5">
                    <div className="space-y-2">
                        <p className="text-2xl md:text-3xl font-medium">Contact Me</p>
                        <p className="text-sm text-gray-400">Fill out the form below and we will get back to you shortly.</p>
                    </div>
                    <div className="max-sm:hidden">
                        <p className="flex items-center gap-2 text-sm text-gray-400"><span><FiPhone /></span><span>+8801327286000</span></p>
                        <p className="flex items-center gap-2 text-sm text-gray-400"><span><MdOutlineEmail /></span><span>dev.mdmasudur@gmail.com</span></p>
                        <p className="flex items-center gap-2 text-sm text-gray-400"><span><IoLocationOutline /></span><span>Dhaka, Bangladesh</span></p>
                    </div>
                </div>
                <form onSubmit={sendMail}>
                    <div>
                        <p className="max-sm-text-sm  my-2">Name</p>
                        <input required name="name" placeholder="Your Name" id="" className="border-2 border-base-300 bg-base-100 rounded-md w-full text-sm md:text-base px-4  py-1 mb-2 bg-transparent" />
                    </div>
                    <div>
                        <p className="max-sm-text-sm  my-2">Email</p>
                        <input required type="email" name="email" placeholder="you@example.com" id="" className="border-2 border-base-300 bg-base-100 rounded-md w-full text-sm md:text-base px-4  py-1 mb-2 bg-transparent" />
                    </div>
                    <div>
                        <p className="max-sm-text-sm  my-2">Subject</p>
                        <input required name="subject" placeholder="Subject" id="" className="border-2 border-base-300 bg-base-100 rounded-md w-full text-sm md:text-base px-4  py-1 mb-2 bg-transparent" />
                    </div>
                    <div>
                        <p className="max-sm-text-sm  my-2">Message</p>
                        <textarea required name="message" placeholder="Message" id="" rows={4} className="border-2 border-base-300 bg-base-100 rounded-md w-full text-sm md:text-base px-4  py-1 mb-2 bg-transparent"></textarea>
                    </div>
                    <input type="submit" value="Send Message" className="px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 hover:from-blue-700 hover:via-indigo-800 hover:to-blue-900 w-full my-5 hover:cursor-pointer rounded-md max-sm:text-sm" />
                </form>
            </div>
        </div>
    )
}