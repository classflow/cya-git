# cya-git

Check your git commit messages for valid Jira issue keys.  
version: [1.0.0][CHANGELOG]

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


![screenshot]


### Removal

To remove cya-git checks from a project, run `cya-git -r` in the project's root.

## In Future Releases

Check out [the TODOs][todo] to see what's coming in future releases.











---
kickstarted by [npm-boom][npm-boom]

[npm-boom]: https://github.com/reergymerej/npm-boom
[jira-query]: https://github.com/reergymerej/jira-query#runtime-config
[CHANGELOG]: CHANGELOG.md
[screenshot]: https://cloud.githubusercontent.com/assets/1720010/17261614/4fdda9cc-559c-11e6-9aef-1292281a55dd.png
[todo]: CHANGELOG.md#todo
