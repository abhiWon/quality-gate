# quality-gate
quality-gate

QUALITY GATE ?
A Quality Gate is a set of measure-based Boolean conditions. It helps you know immediately whether your project is production-ready. If your current status is not Passed, you'll see which measures caused the problem and the values required to pass.

Limitations

1] If no of lines of code is less than 20, the SonarCloud code analysis won't trigger the analysis.
2] Need to ensure that the rule is added on master branch to ensure that only if the checks related to SonarCloud Code Analyis & SonarCloud Build are successful, user can merge the PR.


ANALYSIS BENCHMARKS:


*******************************************************************************************************
RELIABILITY - A coding error that will break your code and needs to be fixed immediately.
*******************************************************************************************************

*******************************************************************************************************
SECURITY - Code that can be exploited by hackers
*******************************************************************************************************

Security Rating will be 'E' when there is atleast 1 Vulnerability

Example Code:

Change this code to not perform client-side redirection based on user-controlled data.

if (window.location.protocol != "https:") window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);

window.location.href.substring(window.location.protocol.length = Source a user can craft an HTTP request with malicious content
"https:" + window.location.href = Concatenation can propagate malicious content to newly created string
window.location.href = Sink: this invocation is not safe, a malicious value can be used as argument

*******************************************************************************************************
MAINTAINABILITY (Code Smells) - Code that is difficult and confusing to maintain
*******************************************************************************************************

Unexpected var, use let or const instead.
Add the "let", "const" or "var" keyword to this declaration of "locator" to make it explicit.
Function has too many parameters (14). Maximum allowed is 7.
Refactor this function to reduce its Cognitive Complexity from 33 to the 15 allowed.


***************************************************************************************
SECURITY REVIEW - Security-sensitive code that requires manual review to assess whether or not a vulnerability exists.
***************************************************************************************
var r = Math.floor(Math.random() * 250);

Using pseudorandom number generators (PRNGs) is security-sensitive. For example, it has led in the past to the following vulnerabilities:

When software generates predictable values in a context requiring unpredictability, it may be possible for an attacker to guess the next value that will be generated, and use this guess to impersonate another user or access sensitive information.

As the Math.random() function relies on a weak pseudorandom number generator, this function should not be used for security-critical applications or for protecting sensitive data. In such context, a cryptographically strong pseudorandom number generator (CSPRNG) should be used instead.


