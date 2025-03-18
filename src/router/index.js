import { createRouter , createWebHistory} from "vue-router"; 
import nav from "@/components/nav.vue";
import Show from "@/components/Show.vue";
import Comment from "@/components/Comment.vue";
const router = createRouter({
    history : createWebHistory(import.meta.env.BASE_URL),
    routes : [
        {
            path : "/",
            redirect : "/topstories",
        },
        {
            path : "/:stories",
            component : Show,
            
        },
        {
            path : "/:stories/:id/comment",
            component : Comment,
        }
    ]
});

export default router;