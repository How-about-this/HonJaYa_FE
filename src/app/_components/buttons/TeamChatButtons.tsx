'use client'

import Image from "next/image";
import TeamCreateModal from "../wait/TeamCreateModal";
import TeamJoinModal from "../wait/TeamJoinModal";
import { useSelector } from "react-redux";
import { RootState } from "@/state/reducers/rootReducer";
import GroupChatCreateModal from "../wait/GroupChatCreateModal";
import TeamEditModal from "../wait/TeamEditModal";

type Props = {
    openTeamCreateModal: boolean;
    setOpenTeamCreateModal: () => void;
    openTeamJoinModal: boolean;
    setOpenTeamJoinModal: () => void;
    openGroupChatCreateModal: boolean;
    setOpenGroupChatCreateModal: () => void;
    openTeamEditModal: boolean;
    setOpenTeamEditModal: () => void;
}

const TeamChatButtons = ({ 
    openTeamCreateModal, setOpenTeamCreateModal, 
    openTeamJoinModal, setOpenTeamJoinModal, 
    openGroupChatCreateModal, setOpenGroupChatCreateModal,
    openTeamEditModal, setOpenTeamEditModal
}: Props) => {
    const onGroup = useSelector((state: RootState) => state.onGroup.onGroup)

    return (
        // <div className="w-full h-full flex justify-center items-center">
        //     <button
        //         className="w-1/10 h-5/10 flex justify-center"
        //         onClick={setOpenTeamCreateModal}>
        //         <Image src="https://www.svgrepo.com/show/498940/add-circle.svg" width={40} height={40} alt="Team Create Button" />
        //     </button>
        //     {openTeamCreateModal && <TeamCreateModal setOpenTeamCreateModal={setOpenTeamCreateModal}/>}
        // </div>
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-1/2 h-1/2 flex">
                {onGroup ?
                    <div className="w-full h-full flex justify-around items-center">
                    <button
                        className=" w-4/10 h-full font-jua text-2xl text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl"
                        onClick={setOpenTeamEditModal}
                    >
                        나의 팀
                    </button>
                    <button
                        className=" w-4/10 h-full font-jua text-2xl text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl"
                        onClick={setOpenTeamJoinModal}
                    >
                        채팅 방 생성
                    </button>
                </div>
                    :
                    <div className="w-full h-full flex justify-around items-center">
                        <button
                            className=" w-4/10 h-full font-jua text-2xl text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl"
                            onClick={setOpenTeamCreateModal}
                        >
                            팀 생성
                        </button>
                        <button
                            className=" w-4/10 h-full font-jua text-2xl text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl"
                            onClick={setOpenTeamJoinModal}
                        >
                            팀 가입
                        </button>
                    </div>
                }

            </div>            
            {openTeamEditModal && <TeamEditModal setOpenTeamEditModal={setOpenTeamEditModal} />}
            {openGroupChatCreateModal && <GroupChatCreateModal setOpenGroupChatCreateModal={setOpenGroupChatCreateModal} />}
            {openTeamCreateModal && <TeamCreateModal setOpenTeamCreateModal={setOpenTeamCreateModal} />}
            {openTeamJoinModal && <TeamJoinModal setOpenTeamJoinModal={setOpenTeamJoinModal} />}
        </div>
    )
}

export default TeamChatButtons;