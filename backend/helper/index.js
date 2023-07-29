const extractDescription = (array) => {
    if (array == null || array == undefined || array.length < 1) {
        return null
    }
    return array[0].Description
}

const isEmpty = (obj) => {
    return obj == null || obj == undefined
}

const transformPictureURL = (pictureURL) => {
    return pictureURL.replace("{format}", "sq").replace("{size}", "4")
}

const transformCoach = (obj) => {
    if (isEmpty(obj)) return undefined
    return {
        IdCoach: obj.IdCoach,
        IdCountry: obj.IdCountry,
        PictureUrl: obj.PictureUrl,
        Name: extractDescription(obj.Name),
        Alias: extractDescription(obj.Alias),
        Role: obj.Role,
        SpecialStatus: obj.SpecialStatus,
    }
}

const transformArrayCoach = (listObj) => {
    if (isEmpty(listObj))
        return undefined
    return listObj.map((e) => (transformCoach(e)))
}

const transformPlayer = (obj) => {
    if (isEmpty(obj)) return undefined
    return {
        IdPlayer: obj.IdPlayer,
        IdTeam: obj.IdTeam,
        ShirtNumber: obj.ShirtNumber,
        Status: obj.Status,
        SpecialStatus: obj.SpecialStatus,
        Captain: obj.Captain,
        PlayerName: extractDescription(obj.PlayerName),
        ShortName: extractDescription(obj.ShortName),
        Position: obj.Position,
        PlayerPicture: obj.PlayerPicture.PictureUrl,
        FieldStatus: obj.FieldStatus,
        LineupX: obj.LineupX,
        LineupY: obj.LineupY,
    }
}

const transformArrayPlayer = (listObj) => {
    if (isEmpty(listObj))
        return undefined
    return listObj.map((e) => (transformPlayer(e)))
}

const transformSubstitution = (obj) => {
    if (isEmpty(obj)) return undefined
    return {
        IdEvent: obj.IdEvent,
        Period: obj.Period,
        Reason: obj.Reason,
        SubstitutePosition: obj.SubstitutePosition,
        IdPlayerOff: obj.IdPlayerOff,
        IdPlayerOn: obj.IdPlayerOn,
        PlayerOffName: extractDescription(obj.PlayerOffName),
        PlayerOnName: extractDescription(obj.PlayerOnName),
        Minute: obj.Minute,
        IdTeam: obj.IdTeam,
    }
}

const transformArraySubstitution = (listObj) => {
    if (isEmpty(listObj))
        return undefined
    return listObj.map((e) => (transformSubstitution(e)))
}

const transformTeam = (obj) => {
    if (isEmpty(obj)) return undefined
    return {
        IdTeam: obj.IdTeam,
        IdAssociation: obj.IdAssociation,
        TeamName: extractDescription(obj.TeamName),
        TeamAbbreviation: obj.Abbreviation,
        TeamPictureUrl: transformPictureURL(obj.PictureUrl),
        Tactics: obj.Tactics,
        Score: obj.Score,
        Coaches: transformArrayCoach(obj.Coaches),
        Players: transformArrayPlayer(obj.Players),
        Bookings: obj.Bookings,
        Goals: obj.Goals,
        Substitutions: transformArraySubstitution(obj.Substitutions),
    }
}

const transformMatch = (obj) => {
    if (isEmpty(obj)) return undefined
    return {
        IdCompetition: obj.IdCompetition,
        IdSeason: obj.IdSeason,
        IdStage: obj.IdStage,
        IdGroup: obj.IdGroup,
        CompetitionName: extractDescription(obj.CompetitionName),
        SeasonName: extractDescription(obj.SeasonName),
        StageName: extractDescription(obj.StageName),
        GroupName: extractDescription(obj.GroupName),
        HomeTeam: transformTeam(obj.Home != null ? obj.Home : obj.HomeTeam),
        AwayTeam: transformTeam(obj.Away != null ? obj.Away : obj.AwayTeam),
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

const transformArrayMatch = (listObj) => {
    if (isEmpty(listObj))
        return undefined
    return listObj.map((e) => (transformMatch(e)))
}

const transformSeason = (obj) => {
    if (isEmpty(obj)) return undefined
    return {
        IdSeason: obj.IdSeason,
        IdCompetition: obj.IdCompetition,
        StartDate: obj.StartDate,
        EndDate: obj.EndDate,
        PictureUrl: transformPictureURL(obj.PictureUrl),
        MascotPictureUrl: transformPictureURL(obj.MascotPictureUrl),
        MatchBallPictureUrl: transformPictureURL(obj.MatchBallPictureUrl),
        HostTeams: obj.HostTeams,
        SportType: obj.SportType,
        Properties: obj.Properties,
        IsUpdateable: obj.IsUpdateable,
        Name: extractDescription(obj.Name),
        ShortName: extractDescription(obj.ShortName),
        Abbreviation: obj.Abbreviation,
        IdMemberAssociation: obj.IdMemberAssociation,
        IdConfederation: obj.IdConfederation,
    }
}

const transformGroup = (obj) => {
    if (isEmpty(obj)) return undefined
    return {
        IdGroup: obj.IdGroup,
        Name: extractDescription(obj.Name),
        Matches: transformArrayMatch(obj.Matches),
    }
}

const transformArrayGroup = (listObj) => {
    if (isEmpty(listObj))
        return undefined
    return listObj.map((e) => (transformGroup(e)))
}

const transformStage = (obj) => {
    if (isEmpty(obj)) return undefined
    return {
        IdStage: obj.IdStage,
        SequenceOrder: obj.SequenceOrder,
        Name: extractDescription(obj.Name),
        Groups: transformArrayGroup(obj.Groups),
        Matches: transformArrayMatch(obj.Matches),
    }
}

const transformArrayStage = (listObj) => {
    if (isEmpty(listObj))
        return undefined
    return listObj.map((e) => (transformStage(e)))
}

const transformSeasonBracket = (obj) => {
    if (isEmpty(obj)) return undefined
    return {
        IdSeason: obj.IdSeason,
        IdCompetition: obj.IdCompetition,
        IdConfederation: obj.IdConfederation,
        Abbreviation: obj.Abbreviation,
        Name: extractDescription(obj.Name),
        ShortName: extractDescription(obj.ShortName),
        KnockoutStages: transformArrayStage(obj.KnockoutStages),
        GroupsStages: transformArrayStage(obj.GroupsStages),
        Winner: obj.Winner,
        Properties: obj.Properties,
        IsUpdateable: obj.IsUpdateable,
    }
}

// const transformSubstitution = (obj) => {}

module.exports = {
    extractDescription,
    transformCoach,
    transformArrayCoach,
    transformPlayer,
    transformArrayPlayer,
    transformSubstitution,
    transformArraySubstitution,
    transformTeam,
    transformMatch,
    transformSeason,
    transformSeasonBracket,
    transformGroup,
    transformArrayGroup,
    transformStage,
    transformArrayStage
}
