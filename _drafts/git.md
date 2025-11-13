Discard all uncommitted changes (both staged and unstaged):
`git reset --hard HEAD`

git rever vs git reset vs git checkout explanation: 
https://www.atlassian.com/git/tutorials/resetting-checking-out-and-reverting

git revert create a new "snapshot" of the commit you specify, does NOT overwrite history. In fact, it records that a commit was done, then was reverted: 
`git revert <hash>` will create a new commit where the <has> spfcified is undone. 