<template>
    <div>
        <!-- GroupsStages -->
        <template v-if="checkIsGroupStage">
            <GroupRankin></GroupRankin>
        </template>

        <!-- KnockoutStages -->
        <template v-else>
            <v-container class="d-flex flex-column">
                <MatchCard
                    v-for="(item, i) in stageData.Matches"
                    :key="i"
                    :match="item"
                    class="mb-1"
                ></MatchCard>
            </v-container>
        </template>
    </div>
</template>

<script>
import GroupRankin from '@/components/GroupRankin.vue'
import MatchCard from '@/components/MatchCard.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'MatchsStages',
    props: {
        stageData: {
            type: Object,
            required: true
        }
    },
    components: { GroupRankin, MatchCard },
    computed: {
        ...mapGetters('seasonbracket', [
            'isGroupStage', // -> this.isGroupStage
        ]),
        checkIsGroupStage() {
            return this.isGroupStage(this.stageData.IdStage)
        }
    }
}
</script>
