import { useState, useEffect } from 'react';

import { Spinner, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';

import ButtonStyled from '../../../../components/Button';
import {
    ButtonWrapper,
    TestStatus,
    EditorAndTestWrapper,
    BoxEditor,
    TabsWrapper,
    TabButton,
    TestCase,
    CaseNavigation,
    TestSectionWrapper,
    TestCasesSection,
    TestResultsSection,
    TestContent,
    CaseButton,
} from '../../styled';

import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';

const CodeAndTestSection = ({ questionData, onSubmit }) => {
    
    const [code, setCode] = useState(questionData.codeTemplate);
    const [codeTemplate, setCodeTemplate] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('java');
    const [currentCase, setCurrentCase] = useState(0);
    const [submitStatus, setSubmitStatus] = useState(true);
    const [oneTimeSubmit, setOneTimeSubmit] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [testResults, setTestResults] = useState(questionData.examples);
    const [activeTab, setActiveTab] = useState('testCases');

    useEffect(() => {
        setCode(questionData.codeTemplate);
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            setSelectedLanguage(storedLanguage);
        }
         // Set the initial code template based on the selected language
         const template =
         selectedLanguage === 'cpp'
             ? questionData.cppCodeTemplate
             : questionData.javaCodeTemplate;
     setCodeTemplate(template);
     setCode(template);
    }, [questionData]);

    const handleChange = (value) => {
        setCode(value);
        localStorage.setItem('codeBE', value);
    };

    const handleSelectChange = (eventKey) => {
        setSelectedLanguage(eventKey);
        localStorage.setItem('language', eventKey);

        const template =
        eventKey === 'cpp'
            ? questionData.cppCodeTemplate
            : questionData.javaCodeTemplate;
    setCodeTemplate(template);
    setCode(template);
    };

    const getLanguageExtension = () => {
        switch (selectedLanguage) {
            case 'cpp':
                return cpp();
            case 'java':
            default:
                return java();
        }
    };

    const submitCode = async () => {
        setSubmitStatus(false);
        setShowResult(true); // Show results after submission
        // Your submitCode logic here
        setTimeout(() => {
            setSubmitStatus(true);
            setOneTimeSubmit(false);
            // Simulating test results
            setTestResults([
                {
                    status: 'Accepted',
                    runTime: '2ms',
                    input: questionData.examples[0].input,
                    output: questionData.examples[0].output,
                },
                {
                    status: 'Rejected',
                    runTime: '3ms',
                    input: questionData.examples[1].input,
                    output: questionData.examples[1].output,
                },
            ]);
        }, 2000);
    };

    const finish = async () => {
        // Your finish logic here
    };

    return (
        <EditorAndTestWrapper>
            <Dropdown onSelect={handleSelectChange}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedLanguage.toUpperCase()}
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg border transform menu">
                    <Dropdown.Item eventKey="cpp">C++</Dropdown.Item>
                    <Dropdown.Item eventKey="java">Java</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <BoxEditor showResult={showResult}>
                <CodeMirror
                    className="editor"
                    value={code}
                    theme={vscodeDark}
                    height="calc(100vh)"
                    maxHeight={showResult ? '40vh' : 'calc(100vh - 250px)'}
                    extensions={[getLanguageExtension()]}
                    onChange={handleChange}
                />
            </BoxEditor>

            <TestSectionWrapper>
                <TabsWrapper>
                    <TabButton
                        active={activeTab === 'testCases'}
                        onClick={() => setActiveTab('testCases')}
                    >
                        Test Cases
                    </TabButton>
                    <TabButton
                        active={activeTab === 'testResults'}
                        onClick={() => setActiveTab('testResults')}
                    >
                        Test Results
                    </TabButton>
                </TabsWrapper>

                <TestContent>
                    {activeTab === 'testCases' && (
                        <TestCasesSection>
                            <CaseNavigation>
                                {testResults.map((_, index) => (
                                    <CaseButton
                                        key={index}
                                        active={index === currentCase}
                                        onClick={() => setCurrentCase(index)}
                                    >
                                        Case {index + 1}
                                    </CaseButton>
                                ))}
                            </CaseNavigation>
                            <h4>Input</h4>
                            <TestCase>
                                
                                <p>{testResults[currentCase].input}</p>
                            </TestCase>
                            <h4>Output</h4>
                            <TestCase>
                                
                                <p>{testResults[currentCase].output}</p>
                            </TestCase>
                        </TestCasesSection>
                    )}

                    {activeTab === 'testResults' && (
                        <TestResultsSection>
                            <TestStatus status={testResults[currentCase].status}>
                                {testResults[currentCase].status}
                            </TestStatus>
                            <CaseNavigation>
                                {testResults.map((_, index) => (
                                    <CaseButton
                                        key={index}
                                        active={index === currentCase}
                                        onClick={() => setCurrentCase(index)}
                                    >
                                        Case {index + 1}
                                    </CaseButton>
                                ))}
                            </CaseNavigation>
                            <h4>Input</h4>
                            <TestCase>
                                <p>{testResults[currentCase].input}</p>
                            </TestCase>
                            <h4>Output</h4>
                            <TestCase> 
                                <p>{testResults[currentCase].output}</p>
                            </TestCase>
                        </TestResultsSection>
                    )}
                </TestContent>
            </TestSectionWrapper>
            <ButtonWrapper>

                <ButtonStyled buttonType="outline2" onClick={submitCode} disabled={!submitStatus}>
                    {submitStatus ? 'SUBMIT' : <Spinner size="sm" />}
                </ButtonStyled>
                <ButtonStyled buttonType="outline" onClick={finish} disabled={oneTimeSubmit}>
                    FINISH
                </ButtonStyled>
            </ButtonWrapper>
        </EditorAndTestWrapper>
    );
};

export default CodeAndTestSection;