import { useState, useEffect } from 'react';
import { fetchAQuestion } from '../../../../utils/api/questionStackAPI';
import CountdownTimer from '../../../CssBattle/components/CountDown';
import {
    DescriptionWrapper,
    DescriptionHeader,
    QuestionSelect,
    DescriptionTitle,
    PlaceholderImage,
    UserInfo,
    UserScore,
    HeaderWrapper,
} from '../../styled';
import { Timer, Title } from '../LeaderBoard/styled';
import { API_URL } from '../../../../config';
const Description = ({ questions, setCurrentQuestion, timeRemaining, userInfo }) => {
    const [questionData, setQuestionData] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);

    useEffect(() => {
        // Fetch the initial question data if questions array is not empty
        if (questions.length > 0) {
            handleQuestionChange(questions[0]);
            console.log("questions got passed from props:",questions);
        }
    }, [questions]);

    const handleQuestionChange = async (questionId) => {
        console.log('Selected Question ID:', questionId); // Log the selected question ID
        try {
            const data = await fetchAQuestion(questionId);
            setQuestionData(data);
            setCurrentQuestionIndex(questions.indexOf(questionId));
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    return (
        <DescriptionWrapper>
            <DescriptionHeader>
                <HeaderWrapper>
                    <UserInfo>{userInfo.fullName}</UserInfo>
                    <UserScore>
                        <strong>Score:</strong> {questionData.score ? questionData.score : 0}
                    </UserScore>
                </HeaderWrapper>
                <HeaderWrapper>
                    <QuestionSelect
                        value={currentQuestionIndex !== null ? questions[currentQuestionIndex] : ''}
                        onChange={(e) => handleQuestionChange(e.target.value)}
                        disabled={questions.length === 0}
                    >
                        {questions.length > 0 ? (
                            questions.map((q, index) => (
                                <option key={q} value={q}>
                                    Question {index + 1}
                                </option>
                            ))
                        ) : (
                            <option value="">No questions available</option>
                        )}
                    </QuestionSelect>
                    <Timer>
                        <Title>Time:</Title>
                        <CountdownTimer targetDate={timeRemaining} />
                    </Timer>
                </HeaderWrapper>
            </DescriptionHeader>
            <DescriptionTitle>{questionData.title}</DescriptionTitle>
            <PlaceholderImage
                src={
                    questionData.local_path
                        ? `${API_URL}/${questionData.local_path}`
                        : 'https://via.placeholder.com/600x400'
                }
                alt={`${questionData.local_path}`}
            />
        </DescriptionWrapper>
    );
};

export default Description;