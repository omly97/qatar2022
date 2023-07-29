<template>
    <v-card outlined color="secondary" class="d-flex flex-column pa-2">
        <div class="white--text text-center text-caption">
            <span>{{ titleComputed }}</span>
        </div>

        <v-sheet class="d-flex justify-space-around align-center" width="100%" color="transparent">
           <!-- Home Team -->
            <div>
                <v-avatar size="50">
                    <v-img
                        :lazy-src="require('@/assets/img/qatar2022V.png')"
                        :src="matchData.HomeTeam.TeamPictureUrl"
                    ></v-img>
                </v-avatar>
                <div class="white--text text-center text-caption font-weight-bold">
                    {{ matchData.HomeTeam.TeamAbbreviation }}
                </div>
            </div>

            <!-- Match a venir -->
            <template v-if="isUpcomingGame">
                <div class="d-flex flex-column text-center text-caption white--text">
                    <span>VS</span>
                    <span>{{ matchData.Match.MatchDate | time }}</span>
                </div>
            </template>

            <!-- Match en cours -->
            <template v-if="isGameInProgess">
                <div class="d-flex flex-column">
                    <div class="text-center">
                        <v-chip
                            x-small
                            color="indigo"
                            class="text-center"
                            text-color="white"
                        >
                            {{ matchData.Match.MatchTime }}
                        </v-chip>
                    </div>
                    <div class="d-flex justify-space-around white--text text-h4">
                        <span>{{ matchData.HomeTeam.Score }}</span>
                        <span class="mx-5">:</span>
                        <span>{{ matchData.AwayTeam.Score }}</span>
                    </div>
                </div>
            </template>

            <!-- Match termine -->
            <template v-if="isPlayedGame">
                <div class="d-flex justify-space-around white--text text-h4">
                    <span>{{ matchData.HomeTeam.Score }}</span>
                    <span class="mx-5">:</span>
                    <span>{{ matchData.AwayTeam.Score }}</span>
                </div>
            </template>

           <!-- Away Team -->
            <div>
                <v-avatar size="50">
                    <v-img
                        :lazy-src="require('@/assets/img/qatar2022V.png')"
                        :src="matchData.AwayTeam.TeamPictureUrl"
                    ></v-img>
                </v-avatar>
                <div class="white--text text-center text-caption font-weight-bold">
                    {{ matchData.AwayTeam.TeamAbbreviation }}
                </div>
            </div>
        </v-sheet>
    </v-card>
</template>

<script>
import useCalendar from '@/api/calendar'
const { getLiveMatch } = useCalendar()

export default {
    name: 'MatchCard',
    props: {
        match: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        matchData: {}
    }),
    computed: {
        titleComputed() {
            const suffx = this.matchData.GroupName != null ? ` - ${this.matchData.GroupName}` : ''
            return `Match ${this.matchData.Match.MatchNumber} ${suffx}`
        },
        isUpcomingGame() {
            return [1, 12].includes(this.matchData.Match.MatchStatus)
        },
        isGameInProgess() {
            return this.matchData.Match.MatchStatus == 3
        },
        isPlayedGame() {
            return this.matchData.Match.MatchStatus == 0
        }
    },
    created() {
        // set match data
        this.matchData = this.match

        // set intervel fetch data
        if (! this.isPlayedGame) {
            setInterval(() => {
                this.fetchLiveData()
            }, 5000);
        }
    },
    methods: {
        fetchLiveData() {
            getLiveMatch(this.matchData.Match.IdMatch).then(response => {
                // Get updates
                let updates = response

                // add undefined const attr in response to updates
                updates.Match.MatchNumber = this.matchData.Match.MatchNumber

                // save updates in date
                this.matchData = updates
            })
        }
    }
}
</script>
