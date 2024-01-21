<?php

namespace Main\FA;

/**
 * Transition class
 *
 * The Transition class represents a transition in a finite automaton.
 * It encapsulates the details of a transition: the starting state (from),
 * the ending state (to), and the label that triggers the transition.
 */
class Transition
{
    /**
     * @var string The state from which the transition originates.
     */
    private string $from;

    /**
     * @var string The state to which the transition goes.
     */
    private string $to;

    /**
     * @var string The label that triggers the transition.
     */
    private string $label;

    /**
     * Transition constructor.
     *
     * @param string $from The starting state of the transition.
     * @param string $to The ending state of the transition.
     * @param string $label The label that triggers the transition.
     */
    public function __construct(string $from, string $to, string $label)
    {
        $this->from = $from;
        $this->to = $to;
        $this->label = $label;
    }

    /**
     * Retrieves the starting state of the transition.
     *
     * @return string The state from which the transition originates.
     */
    public function getFrom(): string
    {
        return $this->from;
    }

    /**
     * Retrieves the ending state of the transition.
     *
     * @return string The state to which the transition goes.
     */
    public function getTo(): string
    {
        return $this->to;
    }

    /**
     * Retrieves the label of the transition.
     *
     * @return string The label that triggers the transition.
     */
    public function getLabel(): string
    {
        return $this->label;
    }

    /**
     * Sets a new starting state for the transition.
     *
     * @param string $from The new starting state.
     */
    public function setFrom(string $from): void
    {
        $this->from = $from;
    }

    /**
     * Sets a new ending state for the transition.
     *
     * @param string $to The new ending state.
     */
    public function setTo(string $to): void
    {
        $this->to = $to;
    }

    /**
     * Sets a new label for the transition.
     *
     * @param string $label The new label for the transition.
     */
    public function setLabel(string $label): void
    {
        $this->label = $label;
    }
}