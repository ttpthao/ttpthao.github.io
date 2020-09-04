#Python 201 - Intermediate Python

#####Michael Driscoll
-

#Index
Menu link here

###Part I: The Intermediate Modules
#####Chapter 1: An Intro to Arugment Parsings using `argparse`
- a replacement for `optparse`
- very useful in writing CLI programs
- can easily define help texts, default values, expected types, mutual exclusitivity, etc

```python
import argparse

def get_args():
	parser = argparse.ArgumentParser(
		description = "A simple argument parser",
		epilog = "Put example usage here")
	
	group = parser.add_mutually_exclusive_group()
	group.add_argument('-x', '--longform', action="store", help="Help for X")
	group.add_argument('-y', default=False, help="Can't be with X")
	parser.add_argument('-z', help="Can define type too", type=int)
	print(parser.parse_args())
	
if __name__ == '__main__':
	get_args()
```

#####Chapter 2: The `collections` Module
- `collections` module has specialized container datatypes that can be more convenient than the usual `dict`, `tuple`, `list`, and `set`
- `ChainMap` link any number of mappings or dictionaries together into a single unit
- When a key in a `ChainMap` is accessed, the module will go through each map in order and pick the first match

```python
from collections import ChainMap

d1 = {"a": 1, "b":2}
d2 = {"c": 3, "d":4}
d3 = {"c": 5, "e": 6}

x = ChainMap(d1, d2, d3)
print(x) #ChainMap({'a': 1, 'b': 2}, {'d': 4, 'c': 3}, {'e': 6, 'c': 5})
print(x["c"]) #3
x["c"] = 8
x["b"] = "django unchained"
print(x) #ChainMap({'a': 1, 'b': 'django unchained', 'c': 8}, {'d': 4, 'c': 3}, {'e': 6, 'c': 5})
```
- `Counter` convenient for fast tallying iterables

```python
from collections import Counter

x = Counter('human engineering')
print(x)
#Counter({'n': 4, 'e': 3, 'g': 2, 'i': 2, 'm': 1, ' ': 1, 'u': 1, 'r': 1, 'h': 1, 'a': 1})

print(x['e']) 
#3

print(list(x.elements()))
#['g', 'g', 'm', ' ', 'u', 'r', 'i', 'i', 'h', 'e', 'e', 'e', 'a', 'n', 'n', 'n', 'n']

print(x.most_common(2))
#[('n', 4), ('e', 3)]

y = Counter('human')
x.subtract(y)
print(x)
#Counter({'e': 3, 'n': 3, 'g': 2, 'i': 2, ' ': 1, 'r': 1, 'm': 0, 'u': 0, 'h': 0, 'a': 0})
```
- `defaultdict` can also take in `string`, `list`, `lambda`, or any other type, not just `int` like example below

```python
from collections import defaultdict

x = "the ripe taste of cheese improves with age"

d = {} #😐 Meh syntax
for w in x.split():
	if w in d:
		d[w] += 1
	else:
		d[w] = 1
print(d)
#{'taste': 1, 'of': 1, 'age': 1, 'the': 1, 'ripe': 1, 'cheese': 1, 'improves': 1, 'with': 1}

d = defaultdict(int) #😁 So much cleaner
for w in x.split():
	d[w] += 1
print(d)
#defaultdict(<class 'int'>, {'taste': 1, 'of': 1, 'age': 1, 'the': 1, 'ripe': 1, 'cheese': 1, 'improves': 1, 'with': 1})
```
- `deque` (pronounced "deck" - double ended queue) is a generalization of stacks and queues; very good when fast popping and appending are more important than fast random access in `list`

```python
from collections import deque

d = deque("these days a chicken leg is a rare dish".split())
print(d)
#deque(['these', 'days', 'a', 'chicken', 'leg', 'is', 'a', 'rare', 'dish'])

d.appendleft("but")
print(d)
#deque(['but', 'these', 'days', 'a', 'chicken', 'leg', 'is', 'a', 'rare', 'dish'])

d.append("indeed")
print(d)
#deque(['but', 'these', 'days', 'a', 'chicken', 'leg', 'is', 'a', 'rare', 'dish', 'indeed'])

d.rotate(1)
print(d)
#deque(['indeed', 'but', 'these', 'days', 'a', 'chicken', 'leg', 'is', 'a', 'rare', 'dish'])
```

- `OrderedDict`

```python
from collections import OrderedDict

d = {"a": 1, "b": 2, "c": 3}
print(d)
#{'b': 2, 'c': 3, 'a': 1}

d = OrderedDict(sorted(d.items()))
print(d)
#OrderedDict([('a', 1), ('b', 2), ('c', 3)])
```

#####Chapter 3: Context Managers
- Context managers are constructs that allow automatic setup and teardown. For example, openning a file and writing to it is a classical use case. In Python 2.5, this could be done with `with`

```python
with open(path, 'w') as f: #Python 2.4+
	f.write(data)
	
f = open(path, 'w') #Python 2.4-
f.write(data)
f.close()
```
- Another common use case that could really use context managers is openning database connection

```python
import sqlite3

class DataConn:
	def __init__(self, db_name):
		self.db_name = db_name
	
	def __enter__(self):
		self.conn = sqlite3.connect(self.db_name)
		return self.conn
		
	def __exit__(self, exc_type, exc_val, exc_tb):
		self.conn.close()

if __name__ == '__main__':
	db = '/home/path/db.db'
	with DataConn(db) as conn:
		cursor = conn.cursor()
```
```python
from contextlib import closing, suppress

with closing(urlopen("http://apple.com")) as webpage:
	for line in webpage:
		print(line) # Connection will close automatically
		
with suppress(FileNotFoundError):
	with open('notfound.file') as f: # Exception will be ignored
		for line in f:
			print(line)
```

#####Chapter 4: The `functools` Module
- `functools` has high-order functions that can act on or return other functions
- `functools.lru_cache` provides caching for the function it decorates

```python
from functools import lru_cache

@lru_cache(maxsize=10)
def get_webpage(module):
	try:
		with urllib.request.urlopen("https://docs.python.org/3/library/{}.html".format(module)) as request:
			return request.read()
		except urllib.error.HTTPError:
			return None
```
- `functools.partial` creates a function with some defaults. This could be useful in GUI programming

```python
from functools import partial

def add(x, y):
	return x + y

p = partial(add, 2)
print(p(4)) # 6
```
- `functools.singledispatch` transform a function into a single dispatch generic function, essentially implementing function overloading

```python
from functools import singledispatch

@singledispatch
def add(a, b):
	raise NotImplementedError("Unsupported type")
	
@add.register(int)
def _(a, b):
	print(a + b)

@add.register(str)
def _(a, b):
	print(a + b)

@add.register(list)
def _(a, b):
	print(a + b)

add(1, 2) # 3
add("Human", "Engineering") # HumanEngineering
add([1, 2, 3], [5, 6]) # [1, 2, 3, 5, 6]
```

#####Chapter 5: All About Imports
```python
import a, b, c # Saves space, but goes against Python's style guide, but who cares
import RPi.GPIO as io # Rename for convenience

def sq_root(a):
	import math # Local import. Appropriate when rarely used
	return math.sqrt(a)
	
# Avoid circular imports like this. You'll run into AttributeError
import b # a.py
def foo():
	pass
	
import a # b.py
def bar():
	pass
	
# Avoid shadowed imports (or name masking)
import a # a.py - this will also throw AttributeError

```

#####Chapter 6: The `importlib` Module
```python
import importlib

def dynamic_import(module_str):
	return importlib.import_module(module_str)
	
importlib.util.module_from_spec(module_spec)
```
- EAFP: easier to ask for forgiveness than permission

#####Chapter 7: Iterators and Generators
- iterable is an object that has the `__iter___` method defined
- iterator is an object that has both `__iter__` and `__next__` defined. The former returns the iterator object itself while the latter returns the next element in the iteration
- Shouldn't call these magic methods (methods with double-underscores) directly. Use the built-ins `iter` and `next` for that
- Generators are functions that can "save" where it last left off (yielding)
- Generators are technically a type of iterator because it implements `__next__` under the hood

```python
def doubler_gen():
	n = 2
	while True:
		yield n
		n *= n

d = doubler_gen()
next(d) # 2
next(d) # 4
next(d) # 16

def silly_gen():
	yield "A sullen smile "
	yield "gets few friends"
	
s = silly_gen()
next(s) # "A sullen smile "
next(s) # "gets few friends" 
next(s) # builtins.StopIteration exception

for s in silly_gen():
	print(s) # for loop automatically handles StopIteration exception and break
```
- This is also how openning file works under the hood. Instead of loading a huge file into memory, Python remembers which line it left off at

#####Chapter 8: The `itertools` Module
- infinite generators: your responsiblity to break or run into an infinite loop

```python
import itertools

for i in count(start=0, step=2):
	print(i) # Infinite loop of even numbers

for i in islice(count(10), 5):
	print(i) # Break after 5 iterations
	
for i in cycle("abc"): # Or any iterable
	print(i) # Infinitely cycle through a, b, and c
```

```python
list(accumulate(range(3)))
# [0, 1, 3] because adding each number in turn
```
- `chain(*iterables)` takes any number of iterables and flatten them all into one iterable

```python
x = 'ABCDEFG'
y = [True, False, True, True, False] # Or anything that evaluates to boolean
list(compress(x, y)) # ['A', 'C', 'D']

list(dropwhile(lambda x: x < 5, [1, 4, 6, 4, 1]))
# [6, 4, 1] # drop value as long as the condition stays True

list(filterfalse(lambda x: x < 5, [1, 4, 6, 4, 1]))
# [6] # return everything that doesn't satisfy the condition

zip_longest(*iterables, fillvalue=None)
for i in zip_longest('ABC', 'xy', fillvalue='BLANK'):
	print(i)
# ('A', 'x')
# ('B', 'y')
# ('C', 'BLANK')
```
- Combinatoric generators: creating combinations and permutation

```python
list(combinations('ABC', 2))
# [('A', 'B'), ('A', 'C'), ('B', 'C')]

list(combinations_with_replacement('ABC', 2)) # include repeated item
# [('A', 'A'), ('A', 'B'), ('A', 'C'), ('B', 'B'), ('B', 'C'), ('C', 'C')]

list(product([1, 2], [3, 4]))
# [(1, 3), (1, 4), (2, 3), (2, 4)] # Cartesian product

list(permutations('ABC', 2))
# [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]
```

#####Chapter 9: Regular Expressions
- Regex can be fast because it's compiled straight down to C and executed, but it can get really difficult to debug
- Use `re.compile` to save a regular expression that is used many times over
- Compilation flags:
	- `re.ASCII`: match against ASCII only instead of full Unicode
	- `re.DEBUG`: display debug info
	- `re.IGNORECASE`
	- `re.MULTILINE`: make `^` matches both beginning of string and of line and `$` matches end of string and of line
	- `re.VERBOSE`: handy when regex gets complicated
- `re.findall` will find all matching instances
- Use raw strings to avoid complicated backslashes escaping

#####Chapter 10: The `typing` Module
- New in Python 3.5 - allows "typing hinting". You specify the type of your parameters, but programmers can still pass in whatever they want
- A nice add on for clearer overloaded methods and cleaner docstring

```python
def foo(bar: str, n: int) -> list:
	return [bar, n]
```

###Part II: Odds and Ends
#####Chapter 11: `map`, `filter`, and more
```python
any([0, 0, 0, 1])
# True - return True if any element in iterable is True

x = 10
eval('x * 2')
# 20

def less_ten(x):
	return x < 10
for i in filter(less_ten, [1, 10, 2, 30]:
	print(i)
	
def double(x):
	return x * 2
for i in map(double, [1, 2, 3]):
	print(i)
```

#####Chapter 12: Unicode
- Python 3 defaults to UTF-8 encoding, meaning you can use Unicode characters in your strings and for variable names
- In Python 2, there are `str` and `unicode` type. In Python 3, there is only `str` type
- Python 3 strings don't have the `decode` attribute, but byte strings do

#####Chapter 13: Benchmarking

```python
if __name__ == "__main__":
	import timeit
	setup = "from __main__ import foobar"
	print(timeit.timeit("foobar", setup=setup))
	
import cProfile
cProfile.run("[x for x in range(1500)]")
```

- Use `line_profiler` to profile each line

#####Chapter 14: Encryption and Cryptography
- hashing with `hashlib`, which includes SHA1, SHA224, SHA256, SHA512, and MD5

```python
import hashlib

md5 = hashlib.md5()
md5.update(b'some string')
md5.digest() # hash
md5.hexdigest() # hash
```
- PyCrypto is the most well known 3rd party cryptography package for Python. It can be used to encrypt strings/files and create RSA keys.

#####Chapter 15: Databases
- PostgreSQL is probably the only database you should be using

```python
import psycopg2

conn = psycopg2.connect(dbname='db', user='user')
cursor = conn.cursor()

cursor.execute("SELECT * FROM table_name")
row = cursor.fetchone()
```

#####Chapter 16: `super`

```python
class SubClass(Parent):
	def __init__(self):
		super().__init__() # Cleaner Python 3 syntax
		# super(SubClass, self).__init__() # Python 2 syntax
```
- Method Resolution Order (MRO) goes from the current object to its parents (in order), and then `object`

#####Chapter 17: Descriptors (magic methods)
- Descriptor is any object that has `__get__`, `__set__`, or `__delete__` implemented
- Modify an object's dictionary directly 

#####Chapter 18: Scope (local, global, and the new non_local)
- Python resolves variables in the nearest enclosing scope

```python
x = 10

def foo(x):
	print(x) # 8
	
def bar():
	print(x) # UnboundLocalError: local variable 'x' referenced before assignment
	x = 5
	print(x) # Would have printed 5

def zoo():
	global x
	print(x) # 10
	
if __name__ == "__main__":
	print(x) # 10
	foo()
	bar(1, 2)
```
- Python 3 also introduces `nonlocal`

```python
def foo():
	n = 0
	for i in range(10):
		nonlocal n # Unbound error because n is referenced before assignment
		n = i
```

###Part III: Working with the Web
#####Chapter 19: Web Scraping
`scrapy` and `beautifulsoup` are popular scraping APIs

#####Chapter 20: Web APIs
#####Chapter 21: Working with FTP via `ftplib`
#####Chapter 22: The `urllib` Module
- Literally nothing good to take note on...

###Part IV: Testing
#####Chapter 24: The `doctest` Module
#####Chapter 25: The `unittest` Module
#####Chapter 26: The `mock` Module
#####Chapter 27: An Intro to coverage.py

###Part V: Concurrency
#####Chapter 28: The `asyncio` Module
- A coroutine is a function that can give up control to its caller without losing its state. It is more memory efficient than threads

```python
import asyncio

async def download(url):
	# download some files here
	
async def main(urls):
	coroutines = [download(url for url in urls]
	completed, pending = await asyncio.wait(coroutines)
	for item in completed:
		print(item.result())
```

#####Chapter 29: The `threading` Module
#####Chapter 30: The `multiprocessing` Module
#####Chapter 31: The `concurrent.futures` Module

