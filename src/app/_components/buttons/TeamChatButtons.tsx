'use client'

import Image from "next/image";
import TeamCreateModal from "../wait/TeamCreateModal";
import TeamJoinModal from "../wait/TeamJoinModal";
import GroupChatCreateModal from "../wait/GroupChatCreateModal";
import TeamEditModal from "../wait/TeamEditModal";
import { useEffect, useState } from "react";
import { getData } from "@/app/api/api";

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
    // const onGroup = useSelector((state: RootState) => state.onGroup.onGroup)
    const [isLeader, setIsLeader] = useState<boolean>();
    const [onGroup, setOnGroup] = useState<boolean>();

    useEffect(() => {
        const getGroupChatServerUser = async () => {
            try {
                const response = await getData(`/user/${localStorage.getItem('user_id')}`, "groupChat")
                console.log(response);
                setIsLeader(response.leader);
                // if (response.isParty) {
                //     dispatch(joinGroup())
                // } else {
                //     dispatch(exitGroup())
                // }
                setOnGroup(response.party);
                console.log(response.party)
            } catch (error) {
                console.log(error);
            }
        }
        getGroupChatServerUser();
    }, [openTeamCreateModal, openTeamJoinModal]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-1/2 h-1/2 flex">
                {onGroup ? isLeader ?
                    <div className="w-full h-full flex justify-around items-center">
                        <button
                            className=" w-4/10 h-full font-jua text-2xl text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl"
                            onClick={setOpenTeamEditModal}
                        >
                            팀 관리
                        </button>
                        <button
                            className=" w-4/10 h-full font-jua text-2xl text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl"
                            onClick={setOpenGroupChatCreateModal}
                        >
                            채팅 방 생성
                        </button>
                    </div> :
                    <div className="w-full h-full flex justify-around items-center">
                        <button
                            className=" w-4/10 h-full font-jua text-2xl text-white shadow-sm bg-gradient-to-r from-main-color to-orange-300 rounded-md hover:ring-4 hover:ring-red-100 active:bg-gradient-to-bl"
                            onClick={setOpenTeamEditModal}
                        >
                            팀 정보
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