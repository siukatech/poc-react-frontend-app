# POC React Frontend App
This is a poc to test react as frontend application.  



# Packages installed
React is 18.2  
React router is 6.11.2  
Others please refer to following snippet.  

```json
    ...
    "@tasoskakour/react-use-oauth2": "^1.2.0",
    "buffer": "^6.0.3",
    "crypto-js": "^4.1.1",
    "date-fns": "^2.30.0",
    "date-fns-tz": "^2.0.0",
    "env-cmd": "^10.1.0",
    "i18next": "^22.5.1",
    "i18next-http-backend": "^2.2.1",
    "jsencrypt": "^3.3.2",
    "randomstring": "^1.3.0",
    "react-i18next": "^12.3.1",
    "react-pro-sidebar": "^1.1.0-alpha.1",
    ...
```



# Environment profiles setup
In package.json, the 'script' block has been modified.  
The additional package 'env-cmd' is required to install for different profiles setup.

```json
  ...
  "scripts": {
    "bak---start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "start": "npm run start:dev",
    "start:dev": "env-cmd -f .env.dev react-scripts start",
    "start:sit": "env-cmd -f .env.sit react-scripts start",
    "build:dev": "env-cmd -f .env.dev react-scripts build",
    "build:sit": "env-cmd -f .env.sit react-scripts build"
  },
  ...
```



# Git
## Remove first commit if there are already other commits
[How to remove the first commit in git?](https://stackoverflow.com/questions/10911317/how-to-remove-the-first-commit-in-git)  
[how to delete all commit history in github? [duplicate]](https://stackoverflow.com/questions/13716658/how-to-delete-all-commit-history-in-github)  

**Referene:**  
https://stackoverflow.com/a/26000395
https://stackoverflow.com/a/45371497

This is usefull to remove the first commit if there are others existed.  

```
# Check out to a temporary branch:
git checkout --orphan TEMP_BRANCH

# Add all the files:
git add -A

# Commit the changes:
git commit -am "Initial commit"

# Delete the old branch:
git branch -D master

# Rename the temporary branch to master:
git branch -m master

# Finally, force update to our repository:
git push -f origin master
```

After the force push commit, github authentication will be prompted.
```
xxxMBP poc-react-frontend-app % git push -f origin main
Username for 'https://github.com': [github login]
Password for 'https://[github login]@github.com': 
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 12 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 463 bytes | 463.00 KiB/s, done.
Total 4 (delta 0), reused 2 (delta 0), pack-reused 0
To https://github.com/[github login]/poc-react-frontend-app.git
 + x1xx1x1...x11xxx1 main -> main (forced update)
xxxMBP poc-react-frontend-app % 
```



## Reset first commit
**Reference:**  
https://stackoverflow.com/a/32765827

This helps to remove the first commit when we have the second.  

> For me, the most secure way is to use the update-ref command:
> 
> ```
> git update-ref -d HEAD
> ```
> It will delete the named reference HEAD, so it will reset (softly, you will not lose your work) ALL your commits of your current branch.
> 
> If what you want is to merge the first commit with the second one, you can use the rebase command:
> 
> ```
> git rebase -i --root
> ```
> A last way could be to create an orphan branch, a branch with the same content but without any commit history, and commit your new content on it:
> 
> ```
> git checkout --orphan <new-branch-name>
> ```
>   


