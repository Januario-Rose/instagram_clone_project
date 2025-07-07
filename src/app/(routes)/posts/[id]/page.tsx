import { getSinglePostData } from "@/actions";
import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";
import SinglePostContent from "@/components/SinglePostContent";
import { Suspense } from "react";

export default async function SinglePostPage({params:{id}}:{params:{id:string}}){
    return (
        <Modal>
            <Suspense fallback={<Preloader/>}>
                <ModalPostContent postId={id} />
            </Suspense>
        </Modal>
        );
}