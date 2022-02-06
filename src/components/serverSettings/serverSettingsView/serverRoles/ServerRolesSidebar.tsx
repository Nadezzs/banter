import tw from "tailwind-styled-components/dist/tailwind";
import { useAppDispatch } from "../../../../redux/hooks";
import { RoleData, useServersState } from "../../../../features/servers";
import {
  setCurrentRole,
  setEditRoleOpen,
  useServerSettingsState,
} from "../../../../features/serverSettings";

export default function ServerRolesSidebar() {
  const { server } = useServersState();
  const { currentRole } = useServerSettingsState();
  const dispatch = useAppDispatch();

  function goBack() {
    dispatch(setEditRoleOpen(false));
  }

  function handleClick(sort: number) {
    const role = server.roles.find((role) => role.sort === sort);
    dispatch(setCurrentRole(role));
  }

  return (
    <Container>
      <TitleContainer>
        <BackButtonContainer>
          <BackButton onClick={goBack}>BACK</BackButton>
        </BackButtonContainer>
      </TitleContainer>

      <NavContainer>
        <SettingsList>
          {server.roles.map((role, index) => {
            const RoleColorStyle = {
              backgroundColor: role.color,
            };

            return (
              <RoleContainer
                currentRole={currentRole}
                sort={role.sort}
                onClick={() => handleClick(role.sort)}
                key={index}
              >
                <RoleColor style={RoleColorStyle} />
                <RoleName>{role.name}</RoleName>
              </RoleContainer>
            );
          })}
        </SettingsList>
      </NavContainer>
    </Container>
  );
}

type RoleContainerProps = {
  currentRole: RoleData;
  sort: number;
};

const Container = tw.div`
  flex flex-col items-end w-fit border-r
`;

const NavContainer = tw.nav`
  w-[232px] pr-2 pb-24 pl-10
`;

const SettingsList = tw.ol`
`;

const TitleContainer = tw.div`
  w-full
`;

const BackButtonContainer = tw.div`
  mr-2 mb-2 ml-4 pt-15 px-2 pb-4 font-semibold
`;

const BackButton = tw.span`
  text-gray-600 cursor-pointer
  hover:text-black
`;

const RoleContainer = tw.div<RoleContainerProps>`
  flex items-center w-[181px] min-h-[34px] px-2.5 py-1.5 mb-0.5 -ml-1.5 font-medium rounded-md cursor-pointer
  hover:bg-gray-100
  ${(props) => (props.currentRole.sort === props.sort ? "bg-gray-300" : "")}
`;

const RoleColor = tw.div`
  flex-none w-3 h-3 rounded-full
`;

const RoleName = tw.span`
  text-sm ml-2 truncate
`;
