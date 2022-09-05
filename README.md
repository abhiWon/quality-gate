# quality-gate

**QUALITY GATE**

A Quality Gate is a set of measure-based Boolean conditions. It helps you know immediately whether your project is production-ready. If your current status is not Passed, you'll see which measures caused the problem and the values required to pass.

************************************************************************************************************************************

**RELIABILITY**

A coding error that will break your code and needs to be fixed immediately.

************************************************************************************************************************************

**SECURITY**

Code that can be exploited by hackers

Example -

_Security Rating will be 'E' when there is atleast 1 Vulnerability_

_Example Code:_

_Change this code to not perform client-side redirection based on user-controlled data._

    if (window.location.protocol != "https:") {

    window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
  
    }

_window.location.href.substring(window.location.protocol.length)_ = **_Source a user can craft an HTTP request with malicious content_** 

_"https:" + window.location.href_ = **_Concatenation can propagate malicious content to newly created string_**

_window.location.href_ = **_Sink: this invocation is not safe, a malicious value can be used as argument_**

************************************************************************************************************************************

**MAINTAINABILITY (Code Smells)**

Code that is difficult and confusing to maintain

_Examples_

Unexpected var, use let or const instead. 

Add the "let", "const" or "var" keyword to this declaration of "locator" to make it explicit.

Function has too many parameters (14). Maximum allowed is 7.

Refactor this function to reduce its Cognitive Complexity from 33 to the 15 allowed.


************************************************************************************************************************************

**SECURITY REVIEW**

Security-sensitive code that requires manual review to assess whether or not a vulnerability exists.

_Examples_

    var r = Math.floor(Math.random() * 250);
    
Using pseudorandom number generators (PRNGs) is security-sensitive

When software generates predictable values in a context requiring unpredictability, it may be possible for an attacker to guess the next value that will be generated, and use this guess to impersonate another user or access sensitive information.

As the Math.random() function relies on a weak pseudorandom number generator, this function should not be used for security-critical applications or for protecting sensitive data. In such context, a cryptographically strong pseudorandom number generator (CSPRNG) should be used instead.

************************************************************************************************************************************

**Limitations**

1] If no of lines of code is less than 20, the SonarCloud code analysis won't trigger the analysis.

2] Your Source Code are analysis results hosted outside your company

3] No LDAP integration possible for user management

4] Cost becomes high if you have a big enterprise with lots of applications.

5] The enterprise features are not available.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=abhiWon_quality-gate&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=abhiWon_quality-gate)
