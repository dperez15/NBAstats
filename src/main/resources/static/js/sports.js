// https://rapidapi.com/api-sports/api/api-baseball?endpoint=apiendpoint_fe974404-4ed3-4a75-bacd-42eed33d2917

// let key = 'e4edfed39c252a1835d0a69812ed08d1';						//	sports.io API
// let url = 'v1.baseball.api-sports.io';

let key = '87b9c32dcemshaff91284092b0b3p1e1598jsn2d4798c61c65';			//  rapid API
let url = "https://api-nba-v1.p.rapidapi.com";

function getNBATeams() {
    let conference = document.getElementById('conference').value;

    fetch(`https://api-nba-v1.p.rapidapi.com/teams/confName/${conference}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "87b9c32dcemshaff91284092b0b3p1e1598jsn2d4798c61c65",
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com"
        }
    })
        .then(response => response.json())
        .then(teams => showNBATeams(teams.api.teams, conference))
        .catch(err => {
            console.error(err);
        });
}
function showNBATeams(teams, conference) {
    let teamTable = document.getElementById('teams');
    let html = `<div class="row">`;
    for (let team of teams) {
        html += `
			<div class="col-xs-5 col-sm-3 col-md-2"><input type=checkbox id=${team.fullName}> ${team.nickname}</div>
			<div class="col-xs-5 col-sm-3 col-md-2">
				<img src=${team.logo} height=50px width=50px onclick='getNBAStats(${team.id},${conference})'>
			</div>`;
    }
    teamTable.innerHTML = html +'</div>';
    console.log("stop");
}
function getNBAStats(id, conference) {
    fetch(`https://${url}/teams/statistics?league=${conference}&team=${id}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key":  `${key}`,
            "x-rapidapi-host": `${url}`
        }
    })
        .then(response => response.json()) //  wait for the response and convert it to JSON
        .then(stats => showStats(stats))
        .catch(err => {
            console.error(err);
        });
}

function getTeams() {
    let season = document.getElementById('season').value;
    let league = document.getElementById('league').value;
    let req= `${url}/teams?league=${league}&season=${season}`;
    fetch(req, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "87b9c32dcemshaff91284092b0b3p1e1598jsn2d4798c61c65",
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com"
        }
    })
        .then(response => response.json()) //  wait for the response and convert it to JSON
        .then(teams => showTeams(teams, league, season))
        .catch(err => {
            console.error(err);
        });
}

function showTeams(teams, league, season) {
    let teamTable = document.getElementById('teams');
    let html = `<div class="row">`;
    for (let team of teams.response) {
        html += `
			<div class="col-xs-5 col-sm-3 col-md-2"><input type=checkbox id=${team.name}> ${team.name}</div>
			<div class="col-xs-5 col-sm-3 col-md-2">
				<img src=${team.logo} height=50px width=50px onclick='getStats(${team.id},${league},${season})'>
			</div>`;
    }
    teamTable.innerHTML = html +'</div>';
}

function getStats(id, league, season) {
    fetch(`https://${url}/teams/statistics?league=${league}&season=${season}&team=${id}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key":  `${key}`,
            "x-rapidapi-host": `${url}`
        }
    })
        .then(response => response.json()) //  wait for the response and convert it to JSON
        .then(stats => showStats(stats))
        .catch(err => {
            console.error(err);
        });
}

function showStats(teamStats) {
    let teamTable = document.getElementById('team');
    let games = teamStats.response.games;
    let goals = teamStats.response.goals;

    html = `<tr><th>${teamStats.parameters.season} Season</th><th>Games Played</th><th>Wins</th><th>Percent Wins</th><th>Loses</th><th>Percent Loses</th><th>Points For</th><th>Points Against</th>`;
    html += `
		<tr><td>Home:</td><td>${games.played.home}</td><td>${games.wins.home.total}</td><td>${(games.wins.home.percentage*100).toFixed(0)}%</td><td>${games.loses.home.total}</td><td>${(games.loses.home.percentage*100).toFixed(0)}%</td><td>${goals.for.average.home}</td><td>${goals.against.average.home}</td><td>The ${teamStats.response.team.name}    <img src=${teamStats.response.team.logo}    width=75px  height=75px></td></tr>
		<tr><td>Away:</td><td>${games.played.away}</td><td>${games.wins.away.total}</td><td>${(games.wins.away.percentage*100).toFixed(0)}%</td><td>${games.loses.away.total}</td><td>${(games.loses.away.percentage*100).toFixed(0)}%</td><td>${goals.for.average.away}</td><td>${goals.against.average.away}</td><td>play in the ${teamStats.response.league.name}  <img src=${teamStats.response.league.logo}  width=130px height=70px></td></tr>
		<tr><td>All: </td><td>${games.played.all} </td><td>${games.wins.all.total} </td><td>${(games.wins.all.percentage *100).toFixed(0)}%</td><td>${games.loses.all.total} </td><td>${(games.loses.all.percentage *100).toFixed(0)}%</td><td>${goals.for.average.all} </td><td>${goals.against.average.all} </td><td>which is in the ${teamStats.response.country.name} <img src=${teamStats.response.country.flag} width=100px height=100px></td></tr>`;
    teamTable.innerHTML += html;
}
