const axios = require("../plugins/axios")

const getRankinMeta = async (locale, entryId) => {
    // create request settings
    const params = { locale: locale }
    const data = { entryId: entryId }
    const url = `https://cxm-api.fifa.com/fifaplusweb/api/sections/fdcpTournamentRelatedSection/${data.entryId}`

    // make request
    var res = []
    await axios.get(url, {params: params}).then(function (response) {
        const newData = {
            entryId: response.data.entryId,
            entryType: response.data.entryType,
            title: response.data.title,
            competitionId: response.data.competitionId,
            seasonId: response.data.seasonId,
        }
        res = { success: true, data: newData }
    }).catch(function (error) {
        res = { success: false, error: error }
    });

    return res
}

const getRankin = async (language, IdCompetition, IdSeason, IdStage) => {
    // create request settings
    const params = { language: language }
    const data = {
        IdCompetition: IdCompetition,
        IdSeason: IdSeason,
        IdStage: IdStage,
    }
    const url = `https://api.fifa.com/api/v3/calendar/${data.IdCompetition}/${data.IdSeason}/${data.IdStage}/standing`

    // create function that transform results to group by GroupName
    const transform = (listObj) => {
        // Create data group by GroupName
        let groupRanks = []
        listObj.forEach(rank => {
            const groupName = rank.Group[0].Description
            const index = groupRanks.findIndex(e => e.GroupName == groupName)
            if (index == -1) {
                groupRanks.push({
                    GroupName: groupName,
                    GroupRanks: [rank]
                })
            } else {
                const newRank = groupRanks[index]
                newRank.GroupRanks.push(rank)
                groupRanks[index] = newRank
            }
        })

        // Sort by proup name
        groupRanks.sort((a, b) => {
            if (a.GroupName < b.GroupName) return -1;
            if (a.GroupName > b.GroupName) return 1;
            return 0;
        })

        // Transform created data
        groupRanks.forEach(item => {
            item.GroupRanks.forEach(gr => {
                gr.Group = gr.Group[0].Description
                gr.Team.Name = gr.Team.Name[0].Description
                gr.Team.DisplayName = gr.Team.DisplayName[0].Description
                gr.Team.PictureUrl = gr.Team.PictureUrl.replace("{format}", "sq").replace("{size}", "4")
            });
        });

        return groupRanks
    }

    // make request
    var res = []
    await axios.get(url, {params: params}).then(function (response) {
        res = { success: true, data: transform(response.data.Results) }
    }).catch(function (error) {
        res = { success: false, error: error }
    });

    return res
}

module.exports = {
    getRankinMeta,
    getRankin
}
