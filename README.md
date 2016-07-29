# cya-git *WARNING: work in progress!*

installs a git hook to validate commit messages  
version: [unreleased][CHANGELOG]

## Installation

* clone
* npm i
* npm link

## Setup

Create `~/.jira-queryrc`, see [jira-query] for details.  Currently only works
when all info is present.  Hook will not wait for user prompts.

```json
{
  "jira-url": "https://jira.pants-online.com",
  "username": "donkey.tomato",
  "password": "unguessable!"
}
```



## TODO
* Figure out how to make hook wait for user prompts.
* Maintain user-provide info across sessions.
* Allow customization of Jira key regex.


---
kickstarted by [npm-boom][npm-boom]

[npm-boom]: https://github.com/reergymerej/npm-boom
[jira-query]: https://github.com/reergymerej/jira-query#runtime-config
[CHANGELOG]: CHANGELOG.md
