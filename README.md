# cya-git

Check your git commit message for a valid Jira issue key.  
version: [unreleased][CHANGELOG]

## Installation

1. Clone this repo.
2. `cd cya-git & npm link`
3. Create `~/.jira-queryrc`, see [jira-query] for details.  Currently only works
when all info is present.  Hook will not wait for user prompts.

```json
{
  "jira-url": "https://jira.pants-online.com",
  "username": "donkey.tomato",
  "password": "unguessable!"
}
```

## Usage

In the root of any git project, run `cya-git`.  From then on, when you commit,
the commit message will be checked for a valid Jira issue key prefix.  If not
found, the commit will be aborted.

![screen shot 2016-07-29 at 13 39 14](https://cloud.githubusercontent.com/assets/1720010/17259675/3b705926-5592-11e6-90c1-e890288d5c1d.png)


### Customizing Key Pattern

TODO: Figure out how I want to do this.

### Removal

To remove cya-git checks from a project, run `cya-git -r` in the project's root.

## TODO before 1.0.0 release
* Allow customization of Jira key regex.
  * Make key check regex case-insensitive.

## TODO

* Add override option.
* Handle preexisting hooks.  Attempt to append to them when possible.
* Figure out how to make hook wait for user prompts.
* Maintain user-provide info across sessions.











---
kickstarted by [npm-boom][npm-boom]

[npm-boom]: https://github.com/reergymerej/npm-boom
[jira-query]: https://github.com/reergymerej/jira-query#runtime-config
[CHANGELOG]: CHANGELOG.md
