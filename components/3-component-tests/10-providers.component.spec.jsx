/// <reference types="Cypress" />

// ----------------------------------------- //
// BONUS EXERCISE                            //
// ----------------------------------------- //

/**
 * Main goals
 * - Wrap the VirtualList into a component that brings the items and set the selection into a state
 * manager of choice (React Context, Redux, MobX, Recoil, Valtio, Zustand, etc. doesn't matter) and
 * test the selection
 *
 * What to think about
 * - We must avoid testing implementation details but we must test as consumers
 * - Swapping state manager should be almost transparent for the test
 *
 * Testing rules
 * - Never do white-box testing. You have to test APIs, contracts, and behaviors, not internal details
 * - Tests failing because of some slight code changes are fragile and must be avoided
 */
