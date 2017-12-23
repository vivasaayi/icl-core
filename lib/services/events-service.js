var EventsService = function () {

};

EventsService.prototype.getTodaysEvents = function (callback) {
	var events = [
		{
			name: "Event 1",
			date: "Today",
			location: "Guindy"
		},
		{
			name: "Event 2",
			date: "Today",
			location: "Central"
		},
		{
			name: "Event 3",
			date: "Next Week",
			location: "Vandaloor"
		},
		{
			name: "Event 4",
			date: "Tomorrow",
			location: "Trunelveli"
		}
	];

	return Promise.resolve(events);
};

module.exports = new EventsService();