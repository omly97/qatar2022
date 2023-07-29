<template>
    <v-card color="secondary">
        <v-simple-table class="transparent white--text" style="width: 100%">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left white--text">{{ rankin.GroupName }}</th>
                        <th class="text-left white--text">P</th>
                        <th class="text-left white--text">W</th>
                        <th class="text-left white--text">D</th>
                        <th class="text-left white--text">L</th>
                        <th class="text-left white--text">GD</th>
                        <th class="text-left white--text">Pts</th>
                    </tr>
                </thead>
            <tbody>
                <tr v-for="(item, i) in rankin.GroupRanks" :key="i">
                    <td>
                        <v-chip
                            x-small
                            color="transparent"
                            label
                            text-color="white"
                            class="px-0 ma-0"
                        >
                            {{ i+1 }}
                            <v-avatar tile class="mx-2">
                                <v-img
                                    :lazy-src="require('@/assets/img/qatar2022V.png')"
                                    :src="item.Team.PictureUrl"
                                ></v-img>
                            </v-avatar>
                            <span class="font-weight-medium">{{ item.Team.Abbreviation }}</span>
                        </v-chip>
                    </td>
                    <td>{{ item.Played }}</td>
                    <td>{{ item.Won }}</td>
                    <td>{{ item.Drawn }}</td>
                    <td>{{ item.Lost }}</td>
                    <td>{{ item.GoalsDiference }}</td>
                    <td>{{ item.Points }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-card>
</template>

<script>
export default {
    name: 'GroupRankinTable',
    props: {
        rankin: {
            type: Object,
            required: true
        }
    }
}
</script>
