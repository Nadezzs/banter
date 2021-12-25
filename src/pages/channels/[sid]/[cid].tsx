import { useEffect } from "react";
import type { NextPage } from "next";
import Servers from "../../../components/Servers/Servers";
import Channels from "../../../components/channels/Channels";
import Chat from "../../../components/chat/Chat";
import UserSettings from "../../../components/userSettings/UserSettings";
import tw from "tailwind-styled-components/dist/tailwind";
import { setUser, resetUserState } from "../../../features/user";
import { useAppDispatch } from "../../../redux/hooks";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useSettingsState } from "../../../features/settings";
import { db } from "../../../../firebase";
import { useRouter } from "next/router";
import Members from "../../../components/Members";
import Title from "../../../components/Title";

const Home: NextPage = () => {
  const auth = getAuth();
  const { userSettingsOpen } = useSettingsState();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const authStateListener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const currentUser = {
            username: docSnap.data().username,

            tag: docSnap.data().tag,

            avatar: docSnap.data().avatar,

            about: docSnap.data().about,

            banner: docSnap.data().banner,

            userID: user.uid,
          };

          dispatch(setUser(currentUser));
        } else {
          // doc.data() will be undefined in this case

          dispatch(resetUserState());

          router.push("/login");

          console.log("No such document!");
        }
      } else {
        dispatch(resetUserState());

        router.push("/login");
      }
    });
    return () => {
      authStateListener();
    };
  }, []);

  return (
    <PageContainer>
      {userSettingsOpen ? (
        <UserSettings />
      ) : (
        <>
          <Servers />

          <Container>
            <Channels />

            <ChatContainer>
              <Title />

              <Container>
                <Chat />

                <Members />
              </Container>
            </ChatContainer>
          </Container>
        </>
      )}
    </PageContainer>
  );
};

export async function getServerSideProps() {
  const auth = getAuth();

  if (!auth) {
    return {
      redirect: {
        destination: "/register",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const PageContainer = tw.div`
  flex w-screen h-screen
`;

const Container = tw.div`
  flex w-full h-full
`;

const ChatContainer = tw(Container)`
  flex-col
`;

export default Home;
