import Link from 'next/link'
import { useContext } from 'react'
import UserContext from '~/lib/UserContext'
import { addChannel } from '~/lib/Store'

export default function Layout(props) {
  const { signOut } = useContext(UserContext)

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  const newChannel = async () => {
    const slug = prompt('Please enter your name')
    if (slug) {
      addChannel(slugify(slug))
    }
  }

  return (
    <main className="flex w-screen h-screen overflow-hidden main">
      {/* Sidebar */}
      <nav
        className="w-64 overflow-scroll text-gray-100 bg-gray-900 "
        style={{ maxWidth: '20%', minWidth: 150, maxHeight: '100vh' }}
      >
        <div className="p-2">
          <div className="p-2">
            <button
              className="w-full px-4 py-2 text-black transition duration-150 bg-green-500 rounded hover:bg-red-300"
              onClick={() => newChannel()}
            >
              New Channel
            </button>
          </div>
          <hr className="m-2" />
          <div className="p-2">
            <button
              className="w-full px-4 py-2 text-white transition duration-150 bg-blue-900 rounded hover:bg-blue-800"
              onClick={() => signOut()}
            >
              Log out
            </button>
          </div>
          <hr className="m-2" />
          <h4 className="font-bold">Channels</h4>
          <ul className="channel-list">
            {props.channels.map((x) => (
              <SidebarItem
                channel={x}
                key={x.id}
                isActiveChannel={x.id === props.activeChannelId}
              />
            ))}
          </ul>
        </div>
      </nav>

      {/* Messages */}
      <div className="flex-1 h-screen bg-gray-800">{props.children}</div>
    </main>
  )
}

const SidebarItem = ({ channel, isActiveChannel }) => (
  <>
    <li>
      <Link href="/channels/[id]" as={`/channels/${channel.id}`}>
        <a className={isActiveChannel ? 'font-bold' : ''}>{channel.slug}</a>
      </Link>
    </li>
  </>
)
