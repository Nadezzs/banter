import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { Channel, setChannel } from "../redux/servers";
import Link from "next/link";
import tw from "tailwind-styled-components/dist/tailwind";

export default function Channels() {
  const { channels } = useAppSelector((state) => state.servers);
  const dispatch = useAppDispatch();

  function handleClick(channel: Channel) {
    dispatch(setChannel(channel));
  }

  return (
    <Nav>
      <Sidebar>
        {channels.map((channel, index) => {
          return (
            <Link href={channel.path} key={index}>
              <a onClick={() => handleClick(channel)}>
                <Channel>{channel.name}</Channel>
              </a>
            </Link>
          );
        })}
      </Sidebar>
    </Nav>
  );
}

const Nav = tw.nav`
    hidden lg:block h-screen
`;

const Sidebar = tw.ol`
`;

const Channel = tw.li`
  cursor-pointer
`;
