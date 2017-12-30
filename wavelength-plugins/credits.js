'use strict';

exports.commands = {
	credits: function (target, room, user) {
		let popup = "|html|" + "<font size=5 color=#0066ff><u><b>" + Config.serverName + " Credits</b></u></font><br />" +
			 "<br />" +
			 "<u><b>Server Maintainers:</u></b><br />" +
			 "- " + WL.nameColor('Prince Sky', true) + " (Owner, Sysadmin, Policy Admin, Server Host)<br />" +
			 "- " + WL.nameColor('Anrin N', true) + " (Owner, Sysadmin, Technical Admin, Server Host)<br />" +
			 "<br />" +
			 "<u><b>Major Contributors:</b></u><br />" +
			 "- " + WL.nameColor('Hoeen Hero', true) + " (Base Repository)<br />" +
			 "- " + WL.nameColor('Insist', true) + " (Base Repository)<br />" +
			 "- " + WL.nameColor('Sparky Heliolisk', true) + " (SSB Leader)<br/>" +
			 "<br />" +
			 "<u><b>Contributors:</b></u><br />" +
			 "- " + WL.nameColor('A Helpful Rayquaza', true) + " (Development)<br />" +
			 "<br />" +
			 "<u><b>Special Thanks:</b></u><br />" +
			 "- Our Staff Members<br />" +
			 "- Our Regular Users<br />";
		user.popup(popup);
	},

	usetoken: function (target, room, user, connection, cmd, message) {
		target = target.split(',');
		if (target.length < 2) return this.parse('/help usetoken');
		target[0] = toId(target[0]);
		if (target[0] === 'intro') target[0] = 'disableintroscroll';
		let msg = '';
		if (['avatar', 'declare', 'icon', 'color', 'emote', 'title', 'disableintroscroll'].indexOf(target[0]) === -1) return this.parse('/help usetoken');
		if (!user.tokens || !user.tokens[target[0]]) return this.errorReply('You need to buy this from the shop first.');
		target[1] = target[1].trim();

		switch (target[0]) {
		case 'avatar':
			msg = '/html <center>' + WL.nameColor(user.name, true) + ' has redeemed a avatar token.<br/><img src="' + target[1] + '" alt="avatar"/><br/>';
			msg += '<button class="button" name="send" value="/customavatar set ' + user.userid + ', ' + target[1] + '">Apply Avatar</button></center>';
			delete user.tokens[target[0]];
			return WL.messageSeniorStaff(msg);
		case 'declare':
			msg += '/html <center>' + WL.nameColor(user.name, true) + ' has redeemed a global declare token.<br/> Message: ' + target[1] + "<br/>";
			msg += '<button class="button" name="send" value="/globaldeclare ' + target[1] + '">Globally Declare the Message</button></center>';
			delete user.tokens[target[0]];
			return WL.messageSeniorStaff(msg);
		case 'color':
			msg += '/html <center>' + WL.nameColor(user.name, true) + ' has redeemed a custom color token.<br/> hex color: <span' + target[1] + '<br/>';
			msg += '<button class="button" name="send" value="/customcolor set ' + user.name + ',' + target[1] + '">Set color (<b><font color="' + target[1] + '">' + target[1] + '</font></b>)</button></center>';
			delete user.tokens[target[0]];
			return WL.messageSeniorStaff(msg);
		case 'icon':
			msg += '/html <center>' + WL.nameColor(user.name, true) + ' has redeemed a icon token.<br/><img src="' + target[1] + '" alt="icon"/><br/>';
			msg += '<button class="button" name="send" value="/customicon set ' + user.userid + ', ' + target[1] + '">Apply icon</button></center>';
			delete user.tokens[target[0]];
			return WL.messageSeniorStaff(msg);
		case 'title':
			if (!target[2]) return this.errorReply('/usetoken title, [name], [hex code]');
			msg += '/html <center>' + WL.nameColor(user.name, true) + ' has redeem a title token.<br/> title name: ' + target[1] + '<br/>';
			msg += '<button class="button" name="send" value="/customtitle set ' + user.userid + ', ' + target[1] + ', ' + target[2] + '">Set title (<b><font color="' + target[2] + '">' + target[2] + '</font></b>)</button></center>';
			delete user.tokens[target[0]];
			return WL.messageSeniorStaff(msg);
		case 'emote':
			if (!target[2]) return this.errorReply('/usetoken emote, [name], [img]');
			target[2] = target[2].trim();
			msg += '/html <center>' + WL.nameColor(user.name, true) + ' has redeem a emote token.<br/><img src="' + target[2] + '" alt="' + target[1] + '"/><br/>';
			msg += '<button class="button" name="send" value="/emote add, ' + target[1] + ', ' + target[2] + '">Add emote</button></center>';
			delete user.tokens[target[0]];
			return WL.messageSeniorStaff(msg);
		case 'disableintroscroll':
			if (!target[1]) return this.errorReply('/usetoken disableintroscroll, [room]');
			let roomid = toId(target[1]);
			if (!Rooms(roomid)) return this.errorReply(`${roomid} is not a room.`);
			if (Db.disabledScrolls.has(roomid)) return this.errorReply(`${Rooms(roomid).title} has already roomintro scroll disabled.`);
			msg += '/html <center>' + WL.nameColor(user.name, true) + ' has redeemed roomintro scroll disabler token.<br/>';
			msg += '<button class="button" name="send" value="/disableintroscroll ' + target[1] + '">Disable Intro Scrool for <b>' + Rooms(roomid).title + '</b></button></center>';
			delete user.tokens[target[0]];
			return WL.messageSeniorStaff(msg);
		default:
			return this.errorReply('An error occured in the command.'); // This should never happen.
		}
	},
	usetokenhelp: [
		'/usetoken [token], [argument(s)] - Redeem a token from the shop. Accepts the following arguments: ',
		'/usetoken avatar, [image] | /usetoken declare, [message] | /usetoken color, [hex code]',
		'/usetoken icon [image] | /usetoken title, [name], [hex code] | /usetoken emote, [name], [image]',
		'/usetoken disableintroscroll [room name]',
	],
};
