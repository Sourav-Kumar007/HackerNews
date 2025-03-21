import { createRouter , createWebHistory} from "vue-router"; 
import nav from "@/components/nav.vue";
import Show from "@/components/Show.vue";
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
    ]
});

export default router;