/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="">
          <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 ml-2 mt-2 -mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/"
                  className='ul-purple
                    block px-4 py-2 text-sm'
                >Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/"
                  className='ul-purpleblock px-4 py-2 text-sm'
                >Communities
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/"
                  className=' ul-purple block px-4 py-2 text-sm'
                >Accomplishments
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className='ul-purple block w-full px-4 py-2 text-left text-sm'
                  >
                    Help Center
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className=
                      'ul-purple block w-full px-4 py-2 text-left text-sm'
                  >Settings
                  </button>
                )}
              </Menu.Item>
            <form method="POST" action="/">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className='ul-purple block w-full px-4 py-2 text-left text-sm'
                  >
                    Log Out 
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
