const axios = require("../plugins/axios")

const transformResultObject = (obj) => {
    const extractDescription = (array) => {
        if (array == null || array == undefined || array.length < 1) {
            return null
        }
        return array[0].Description
    }

    const transformCoaches = (listObj) => {
        if (listObj == null || listObj == undefined) {
            return undefined
        }
        return listObj.map((e) => ({
            IdCoach: e.IdCoach,
            IdCountry: e.IdCountry,
            PictureUrl: e.PictureUrl,
            Name: extractDescription(e.Name),
            Alias: extractDescription(e.Alias),
            Role: e.Role,
            SpecialStatus: e.SpecialStatus,
        }))
    }

    const transformPlayers = (listObj) => {
        if (listObj == null || listObj == undefined) {
            return undefined
        }
        return listObj.map((e) => ({
            IdPlayer: e.IdPlayer,
            IdTeam: e.IdTeam,
            ShirtNumber: e.ShirtNumber,
            Status: e.Status,
            SpecialStatus: e.SpecialStatus,
            Captain: e.Captain,
            PlayerName: extractDescription(e.PlayerName),
            ShortName: extractDescription(e.ShortName),
            Position: e.Position,
            PlayerPicture: e.PlayerPicture.PictureUrl,
            FieldStatus: e.FieldStatus,
            LineupX: e.LineupX,
            LineupY: e.LineupY,
        }))
    }

    const transformSubstitutions = (listObj) => {
        if (listObj == null || listObj == undefined) {
            return undefined
        }
        return listObj.map((e) => ({
            IdEvent: e.IdEvent,
            Period: e.Period,
            Reason: e.Reason,
            SubstitutePosition: e.SubstitutePosition,
            IdPlayerOff: e.IdPlayerOff,
            IdPlayerOn: e.IdPlayerOn,
            PlayerOffName: extractDescription(e.PlayerOffName),
            PlayerOnName: extractDescription(e.PlayerOnName),
            Minute: e.Minute,
            IdTeam: e.IdTeam,
        }))
    }

    const transformTeamObject = (obj) => {
        if (obj == null || obj == undefined) {
            return undefined
        }
        return {
            IdTeam: obj.IdTeam,
            TeamName: extractDescription(obj.TeamName),
            TeamAbbreviation: obj.Abbreviation,
            TeamPictureUrl: obj.PictureUrl.replace("{format}", "sq").replace("{size}", "4"),
            Tactics: obj.Tactics,
            Score: obj.Score,
            Coaches: transformCoaches(obj.Coaches),
            Players: transformPlayers(obj.Players),
            Bookings: obj.Bookings,
            Goals: obj.Goals,
            Substitutions: transformSubstitutions(obj.Substitutions),
        }
    }

    return {
        IdCompetition: obj.IdCompetition,
        IdSeason: obj.IdSeason,
        IdStage: obj.IdStage,
        IdGroup: obj.IdGroup,
        CompetitionName: extractDescription(obj.CompetitionName),
        SeasonName: extractDescription(obj.SeasonName),
        StageName: extractDescription(obj.StageName),
        GroupName: extractDescription(obj.GroupName),
        HomeTeam: transformTeamObject(obj.Home != null ? obj.Home : obj.HomeTeam),
        AwayTeam: transformTeamObject(obj.Away != null ? obj.Away : obj.AwayTeam),
        Match: {
            IdMatch: obj.IdMatch,
            MatchDate: obj.Date,
            MatchDay: obj.MatchDay,
            MatchNumber: obj.MatchNumber,
            HomeTeamScore: obj.HomeTeamScore,
            AwayTeamScore: obj.AwayTeamScore,
            HomeTeamAggregateScore: obj.AggregateHomeTeamScore,
            AwayTeamAggregateScore: obj.AggregateAwayTeamScore,
            HomeTeamPenaltyScore: obj.HomeTeamPenaltyScore,
            AwayTeamPenaltyScore: obj.AwayTeamPenaltyScore,
            MatchTime: obj.MatchTime,
            MatchFirstHalfTime: obj.FirstHalfTime,
            MatchSecondHalfTime: obj.SecondHalfTime,
            MatchFirstHalfExtraTime: obj.FirstHalfExtraTime,
            MatchSecondHalfExtraTime: obj.SecondHalfExtraTime,
            MatchWinnerTeamId: obj.Winner,
            HomeTeamBallPossession: obj.BallPossession ? obj.BallPossession.OverallHome : null,
            AwayTeamBallPossession: obj.BallPossession ? obj.BallPossession.OverallAway : null,
            MatchStatus: obj.MatchStatus,
            ResultType: obj.ResultType,
        },
        Stadium: {
            IdStadium: obj.Stadium.IdStadium,
            Name: extractDescription(obj.Stadium.Name),
        },
    }
}

const baseURL = "https://api.fifa.com/api/v3"

const getCalendar = async (fromDate, toDate, language, count, idSeason) => {
    const url = `${baseURL}/calendar/matches`
    const params = {
        from: fromDate,
        to: toDate,
        language: language,
        count: count,
        idSeason: idSeason
    }

    var res = []
    await axios.get(url, {params: params}).then(function (response) {
        const results = response.data.Results
        results.forEach(obj => {
            res.push(transformResultObject(obj))
        })
        res = { success: true, data: res }
    }).catch(function (error) {
        res = { success: false, error: error }
    });

    return res
}

const getLiveMatch = async (matchId, language) => {
    const url = `${baseURL}/live/football/${matchId}`
    const params = { language: language }

    var res = []
    await axios.get(url, {params: params}).then(function (response) {
        res = { success: true, data: transformResultObject(response.data) }
    }).catch(function (error) {
        res = { success: false, error: error }
    });

    return res
}

module.exports = {
    getCalendar,
    getLiveMatch
}
