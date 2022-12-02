const axios = require("../plugins/axios")

const transformResultObject = (obj) => {
    const transformCoaches = (listObj) => {
        if (listObj == null || listObj == undefined) {
            return undefined
        }
        return listObj.map((e) => ({
            IdCoach: e.IdCoach,
            IdCountry: e.IdCountry,
            PictureUrl: e.PictureUrl,
            Name: e.Name[0].Description,
            Alias: e.Alias[0].Description,
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
            PlayerName: e.PlayerName[0].Description,
            ShortName: e.ShortName[0].Description,
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
            PlayerOffName: e.PlayerOffName[0].Description,
            PlayerOnName: e.PlayerOnName[0].Description,
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
            TeamName: obj.TeamName[0].Description,
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
        CompetitionName: obj.CompetitionName[0].Description,
        SeasonName: obj.SeasonName[0].Description,
        StageName: obj.StageName[0].Description,
        GroupName: obj.GroupName[0].Description,
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
            Name: obj.Stadium.Name[0].Description,
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
