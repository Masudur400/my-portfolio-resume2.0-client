/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, FolderGit2, UserCheck, Github } from "lucide-react"
import Image from "next/image"

export default function GithubStats() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://api.github.com/users/Masudur400")
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-400 animate-pulse">Loading...</p>
      </div>
    )
  }

  return (
    <section className="my-14 px-4  text-gray-200">
      {/* <h2 className="text-3xl font-bold mb-10 text-center text-gray-100">
        GitHub <span className="text-indigo-400">Profile & Stats</span>
      </h2> */}

      {data && (
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Profile Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center text-center md:text-left gap-6 md:gap-12">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="p-[4px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-700 hover:from-blue-600 hover:via-indigo-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-indigo-900/50">
                <Image
                  src={data?.avatar_url}
                  alt={data?.login}
                  width={150}
                  height={150}
                  className="rounded-full transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>


            {/* Profile Info */}
            <div className="flex flex-col items-center md:items-start ">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-100">{data?.name}</h3>
              <p className="text-gray-400 mt-1">@{data?.login}</p>
              {data?.bio && (
                <p className="mt-3 max-w-lg text-gray-400">{data?.bio}</p>
              )}
              <a
                href={data?.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-fit px-4 py-2 rounded-md flex gap-2 justify-center items-center text-white font-semibold text-sm sm:text-base bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-700 hover:from-blue-600 hover:via-indigo-700 hover:to-blue-800 shadow-md hover:shadow-lg hover:shadow-indigo-900/50 transition-all duration-300"
              >
                Visit GitHub Profile
              </a>
            </div>
          </div>


          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Username */}
            <Card className="group shadow-sm hover:shadow-xl transition duration-300 rounded-2xl bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center items-center mb-3">
                  <Github className="w-10 h-10 text-gray-200 group-hover:scale-110 transition" />
                </div>
                <h3 className="text-gray-400 font-medium">Username</h3>
                <p className="text-xl font-semibold text-gray-100 mt-1">@{data?.login}</p>
              </CardContent>
            </Card>

            {/* Public Repos */}
            <Card className="group shadow-sm hover:shadow-xl transition duration-300 rounded-2xl bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center items-center mb-3">
                  <FolderGit2 className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition" />
                </div>
                <h3 className="text-gray-400 font-medium">Public Repos</h3>
                <p className="text-2xl font-bold text-indigo-300 mt-1">{data?.public_repos}</p>
              </CardContent>
            </Card>

            {/* Followers */}
            <Card className="group shadow-sm hover:shadow-xl transition duration-300 rounded-2xl bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center items-center mb-3">
                  <Users className="w-10 h-10 text-green-400 group-hover:scale-110 transition" />
                </div>
                <h3 className="text-gray-400 font-medium">Followers</h3>
                <p className="text-2xl font-bold text-green-300 mt-1">{data?.followers}</p>
              </CardContent>
            </Card>

            {/* Following */}
            <Card className="group shadow-sm hover:shadow-xl transition duration-300 rounded-2xl bg-white/5 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center items-center mb-3">
                  <UserCheck className="w-10 h-10 text-pink-400 group-hover:scale-110 transition" />
                </div>
                <h3 className="text-gray-400 font-medium">Following</h3>
                <p className="text-2xl font-bold text-pink-300 mt-1">{data?.following}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </section>
  )
}
