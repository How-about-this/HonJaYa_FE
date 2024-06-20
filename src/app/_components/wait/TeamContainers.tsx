'use client'

import { useEffect, useState } from "react";
import Team from "./Team";
import { getData } from "@/app/api/api";

// Props 타입 객체
interface Props {
    objects: any;
    prevSlide: () => void;
    nextSlide: () => void;
    currentPage: number;
    objectsPerPage: number;
}

const TeamContainers = ({ objects, prevSlide, nextSlide, currentPage, objectsPerPage }: Props) => {

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [currentObjects, setCurrentObjects] = useState<any[]>([])
    const [placeholders, setPlaceholders] = useState<string[]>([])
    const [groupChatServerId, setGroupChatServerId] = useState<string>("");
    const [isLeader, setIsLeader] = useState<boolean>(false);
    const [onGroup, setOnGroup] = useState<boolean>(false);

    useEffect(() => {

        const startIndex = currentPage * objectsPerPage;
        const currentObjects = objects.slice(startIndex, startIndex + objectsPerPage);
        setCurrentObjects(currentObjects);
        const emptySlots = objectsPerPage - currentObjects.length;
        const placeholders = Array(emptySlots).fill("");
        setPlaceholders(placeholders);
    }, [currentPage, objects, objectsPerPage])


    useEffect(() => {
        const getGroupChatServerUser = async () => {
          try {
            const response = await getData(`/user/${localStorage.getItem('user_id')}`, "groupChat")
            console.log(response);
            setGroupChatServerId(response.id)
            setIsLeader(response.leader);
            setOnGroup(response.party);
          } catch (error) {
            console.log(error);
          }
        }
        getGroupChatServerUser();
      }, []);
        // //본 서비스에서 유저 이름, 유저 성별 가져오기 -> 몽고 디비에 저장 용도
        // const getUserData = async () => {
        //   try {
        //     const userData = await getData(`/users/${localStorage.getItem('user_id')}/profile`, 'honjaya')
        //     setUserGender(userData.data.gender);
        //   } catch (error) {
        //     console.log(error);
        //   }
        // }
        // getUserData();

    return (
        <div
            className="z-10 w-full h-7/10 flex content-around items-center justify-center relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered &&
                <button onClick={prevSlide} disabled={currentPage === 0} className="w-10 h-1/10 py-2 bg-main-color text-white rounded disabled:bg-gray-300 box-border bg-left-arrow bg-center bg-cover">
                </button>
            }
            <div className="w-9/10 h-full flex flex-wrap items-center justify-center">
                {currentObjects && currentObjects.map((object, index) => (
                    object.gender === localStorage.getItem("userGender")? <Team object={object} key={index}/> : <></>
                ))}
                {placeholders && placeholders.map((_, index) => (
                    <div key={`placeholder-${index}`} className="w-1/5 h-2/5 mx-5 py-4 bg-gray-200 box-border shadow-lg rounded-lg"></div>
                ))}
            </div>
            {isHovered &&
                <button onClick={nextSlide} disabled={(currentPage + 1) * objectsPerPage >= objects.length} className="w-10 h-1/10 py-2 bg-main-color text-white rounded disabled:bg-gray-300 box-border bg-right-arrow bg-center bg-cover">
                </button>
            }
        </div>
    )
}

export default TeamContainers;
