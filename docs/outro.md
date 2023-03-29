# Outro

## What we didn't deepen

- Code coverage
- CI
- Visual regression testing
- Snapshot testing
- Cross-browser tests
- Mobile (through changing user-agent) testing


## Some more testing rules

- You should write the test as soon as you write the code
- Avoid conditional tests as much as you can, the test code must be straightforward
- The test must fail before you write the code and succeed when you have written the code. Otherwise, you can not be sure that the test is testing your code
- Code coverage helps us find what we have not tested yet, it is not an end in itself
- If you're not enough confident about your application (you are not sure that it works even if the tests pass), think twice about your tests. Why they do not give you enough confidence? How could you improve them?
- You should not test external services, you should test how you consume them, not if they work or not
- You should not test third-party scripts and libraries
- You should not test native APIs
- If you find yourself blaming the tests because of their maintenance... there's something wrong
- checking that something isn't visible must be done after checking that's visible
- checking that something didn't happen is hard, avoid it
