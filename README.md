# Emergency Badges

A basic framework to help people give recognition via [Open Badges](http://openbadges.org/ "OpenBadges") during times of emergency. 

This project was born out of a hack jam at the Mozilla Festival in the "Emergency Hack Lab" workshop.

## Bootstrapping

To get up and running, you're going to need to do a little bit of configuration. At this time, we're assuming you're using Heroku.

* Clone the repository and run `heroku create`.
* Add free `redistogo` add-on to your Heroku app: `heroku addons:add redistogo`.
* Add free `cloudant` add-on to your Heroku app: `heroku addons:add cloudant`.
* Run `npm install` like a civilized person.
* Set some environment variables: `heroku config:set TWILIO_ACCOUNT_ID=… TWILIO_AUTH_TOKEN=… TWILIO_PHONE_NUMBER=…`. Replace the ellipses with the pertinent information.
* Deploy your little heart out.

## About

### Workflow

Check out an interactive workflow here: *http://proto.ballard.is/moz/ehl/*

* **Organize:** Citizens organize into a help center and create lists of citizen tasks (not being handled by emergency responders) and OpenBadges. Examples of relevent badge descriptions and criteria can be found here. Crowdcrafting could be used as the micro-tasking tool for the community.
* **Application and Scheduling:** Volunteers are reviewed and sign up for specific tasks.
* **Perform and Verify Task:** OrgMemberA performs a task which is seen/verified by OrgMemberB. OrgMemberB texts in the ID of the OrgMemberA + location ID + any (optional) evidence. 
* **Badge:** OrgMemberA (the volunteer who has been seen or verified doing something) receives an SMS badge which consits of a claim code plus an option to text back to learn about remaining tasks.
* **Feedback:** The volunteer who has been seen/verified doing something receives an SMS badge which consits of a claim code plus an option to text back to learn about remaining tasks.

### User Stories

* **Neighborhood:** Our neighborhood has a lot of different initiatives going on in it, from a bunch of different organizations. We're excited people want to help, and we'd like to be able to let them know what worked and what didn't, and have a celebration of the communal efforts that emerged from a terrible situation. Ideally, folk who helped right after a crisis will also want to come back for later rebuilding efforts, after most of the organizations and attention have moved on to other events. To do this, we include our group_IDa in our community response centers and sign posts. We even designed our own badge for the folk who helped out! 
* **Organization X:** I am a part of a response organization. We have several projects going in an area, and want credit for what we're up to. We include our group_IDb on pamphlets going out to our target area, and encourage people we interact with to propegate the meme. After a deployment, we celebrate our associated volunteers and the badges they obtained, and we create an overall impact sheet of participants and points of endorsement. We may even set up a mentorship program between people with advanced badges and those first joining our organization.
* **Resident:** I live in a place that just got torn appart by some natural event or another (tho not the bad kerning that makes that look like "tom apart") (dear jetlag). The task of cleaning up and getting life back together seems insurmountable. Some of the volunteers in the area are pretty great, and I'd like to thank them, but I don't have the mental bandwidth to follow up with each of them (or remember exactly what each of them did). I did get this nifty pamphlet, tho, which includes information about the Organization X's initiative, and our neighborhood has one as well. When Volunteer A did some work which totally made my life suck less, I decided it was more for the neighborhood than the Organization's objectives, and so I texted in with "group_IDa VolunteerIDa!" Later, I get to see them, along with other people who helped, celebrated at the town hall. Something Volunteer_IDb did totally helped out group_IDb, so I sent in a similar text to verify that. 
* **Volunteer for Organization X:** I want to do good in the world, and I've signed up to Organization X because I like what they do, and how I work with them. While I see our project moving forward, I don't have a direct connection to the people we're helping. I'd like to know that the work I do is worthwhile, so I ask the people I interact with to text in if I've done a useful things, and write down my Volunteer_IDa for them. I still make personal connections, and am in direct contact with some folk - but I want my organization to know I'm going good work, too! 
* **Volunteer at Large:**I came into the affected neighborhood because I have significant previous experience in response (check out all my badges!). I want to be sure I'm helping where it's needed, and so I ask people I interact with to ping the system. From that feedback, I can see that I did an awful lot of work around Organization X's objectives, and will reach out to them about working more closely in the future. Knowing that I did good work makes me want to go back and help more, too. 

### Badge Descriptions

Check out the badge descriptions etherpad here *https://etherpad.mozilla.org/emergency-badges*