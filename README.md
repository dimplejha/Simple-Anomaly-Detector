Simple Anomaly Detector

Input: A directory containing 100 files named <machinename>.facts. Each file contains key value pairs in the format <fact name>:<fact value> in each line. 

Objective of the program is to implement a strategy to find out if facts are the same across the machines and report if any machine is deviating from the norm with respect to any of the facts.

Some facts may have totally random or different values across the machines (eg, serial number of a machine). You should ignore those facts.
Some facts will be the same across all the machines and that means there is no anomaly in them.
Some facts will be the same in the majority of the machines, but will have different values in the remaining machines, the program should report such facts and the deviating machines as anomalies.

Sample Fact file (the keys and values are samples only):
Machine1.facts
Model: lenovo thinkpad
OSType: Windows
OSVersion: 10
Serial: ABCD1234

Machine2.facts
Model: lenovo thinkpad
OSType: Windows
OSVersion: 10
Serial: ABCD2222

Machine3.facts
Model: lenovo thinkpad
OSType: Windows
OSVersion: 11
Serial: ABCD3333

Output
OSVersion: [machine3]



Bonus (not in any priority order)
Some facts may have distinct sets of values. E.g., if fact1 has value1 in 40 machines and value2 for remaining 60 machines, neither is anomalous. A value is anomalous only if 5 or less machines have that value.
There is another program[1] which is updating these facts files every minute. If your program is reading the file while the other program is updating it, there is a chance that your program reads corrupted data. Ensure this doesn't happen.
Read 10 input files at a time parallelly instead of one.
Add unit test cases and generate a code coverage report.


Bonus++ (not in any priority order)
Implement the program [1] mentioned above which updates files every minute. No file should be stale beyond 1 minute.
If any of the fact value is numeric, the value is anomalous only if its standard deviation is high. Eg. if the values are [10, 10, 9, 11, 11, 35] then only 35 is anomalous.







